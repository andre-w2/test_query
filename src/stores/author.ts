import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiPosts from '../api/posts'
import IPosts from '../types/posts'
import { getItem } from '../utils/storage'
import IAuthor from '../types/author'
import { KEY_POSTS } from './posts'

export const useAuthorStore = defineStore('author', () => {
    const author = ref<IAuthor>({} as IAuthor)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const getAuthor = (id: number) => {
        isLoading.value = false

        const postsCache: IPosts[] = getItem(KEY_POSTS)
        const isAuthor = postsCache.find(i => i.id === id)

        if (isAuthor) {
            const postFind: IPosts = postsCache.filter(i => i.id === id)[0]
            author.value = postFind.author
            isLoading.value = true
        } else {
            return new Promise(() => {
                apiPosts.users(id)
                    .then(res => {
                        author.value = res.data

                        isLoading.value = true
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        }
    }

    return {
        author,
        isLoading,
        getAuthor,
        error
    }
})