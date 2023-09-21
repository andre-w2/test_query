import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem } from '../utils/storage'
import { KEY_POSTS } from './posts'
import IPosts from '../types/posts'

export const useLastViewStore = defineStore('last_view', () => {
    const posts = ref<IPosts[]>([])

    const getPostsCache = () => {
        const postsCache: IPosts[] = getItem(KEY_POSTS)
        posts.value = postsCache.filter(i => i?.isVisible === true)
    }

    return {
        posts,
        getPostsCache,
    }
})