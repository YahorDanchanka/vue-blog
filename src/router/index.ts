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
    beforeEnter: async () => {
      await store.dispatch('fetchPosts')
      return true
    },
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
  {
    path: '/admin/posts',
    name: 'admin/posts/index',
    component: () => import('@/views/admin/posts/Index.vue'),
    beforeEnter: async () => {
      await store.dispatch('fetchPosts')
      return true
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(() => {
  store.commit('disableSearch')
})

export default router
