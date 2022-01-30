import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

declare module 'vue-router' {
  interface RouteMeta {
    layout: string | undefined
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/posts/:id(\\d+)',
    name: 'posts/view',
    component: () => import('@/views/posts/View.vue'),
    beforeEnter: async (to) => {
      await store.dispatch('fetchPost', to.params.id)
      return true
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
