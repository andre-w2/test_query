import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiPosts from '../api/posts'
import IPosts from '../types/posts'
import { getItem, setItem } from '../utils/storage'

export const KEY_POSTS = 'posts'
export const TIME_CACHE = 'TIME_CACHE'

export const usePostsStore = defineStore('posts', () => {
    const posts = ref<IPosts[]>([])
    const post = ref<IPosts>({} as IPosts)
    const isLoading = ref(false)
    const isLoadingMore = ref(false)
    const error = ref<string | null>(null)

    const getPosts = ({ isNew, page }: { isNew: boolean, page: number }) => {
        if (!isNew) {
            isLoading.value = false
        } else {
            isLoadingMore.value = false
        }

        const postsCache: IPosts[] = getItem(KEY_POSTS)

        if (postsCache?.length && !isNew) {
            posts.value = postsCache
            isLoading.value = true
        } else {
            return new Promise(() => {
                apiPosts.posts(`_page=${page}&_limit=4`)
                    .then((res) => {
                        const postsData = res.data;
                        const requests: any = [];

                        postsData.forEach((postData: IPosts) => {
                            const request = apiPosts.users(postData.userId)
                                .then((user) => {
                                    postData.author = user.data;
                                });

                            requests.push(request);
                        });
                        Promise.all(requests)
                            .then(() => {
                                const commentRequests: any = [];
                                postsData.forEach((postData: IPosts) => {
                                    const request = apiPosts.comments(postData.id)
                                        .then((comments) => {
                                            postData.comments = comments.data;
                                        });
                                    commentRequests.push(request);
                                });
                                return Promise.all(commentRequests);
                            })
                            .then(() => {
                                if (posts.value.length) {
                                    posts.value = [...posts.value, ...postsData]
                                } else {
                                    posts.value = postsData;
                                }
                                setItem(KEY_POSTS, posts.value);
                                setItem(TIME_CACHE, new Date())
                                isLoading.value = true;
                                isLoadingMore.value = true
                            })
                            .catch((err: Error) => {
                                console.error(err);
                                error.value = err.message;
                            });
                    })
                    .catch((err: Error) => {
                        console.error(err);
                        error.value = err.message;
                    });
            });
        }
    };

    const getPost = (id: number) => {
        isLoading.value = false

        const postsCache: IPosts[] = getItem(KEY_POSTS)
        const isPost = postsCache.find(i => i.id === id)

        if (isPost) {
            const postFind: IPosts = postsCache.filter(i => i.id === id)[0]
            post.value = postFind
            isLoading.value = true
        } else {
            return new Promise(() => {
                apiPosts.post(id)
                    .then(res => {
                        post.value = res.data

                        apiPosts.users(res.data.userId)
                            .then(data => {
                                apiPosts.comments(id)
                                    .then(comments => {
                                        post.value.author = data.data
                                        post.value.comments = comments.data
                                        isLoading.value = true
                                    })
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        }
    }

    const setVisible = (id: number) => {
        const postsCache: IPosts[] = getItem(KEY_POSTS)
        const isPost = postsCache.find(i => i.id === id)

        if (isPost) {
            const postFind: IPosts = postsCache.filter(i => i.id === id)[0]
            if (!postFind?.isVisible) {
                postFind.isVisible = true

                setItem(KEY_POSTS, postsCache)
            }
        }
    }

    return {
        posts,
        getPosts,
        isLoading,
        getPost,
        post,
        error,
        setVisible,
        isLoadingMore
    }
})