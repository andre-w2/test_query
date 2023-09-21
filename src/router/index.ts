import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/Articles.vue'),
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('../views/Details.vue'),
    },
    {
      path: '/profile/:author',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
    },
  ],
})

export default router