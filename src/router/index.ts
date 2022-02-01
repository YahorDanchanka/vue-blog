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
      store.commit('enableSearch')
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
      store.commit('enableSearch')
      await store.dispatch('fetchPosts')
      return true
    },
  },
  {
    path: '/admin/posts/create',
    name: 'admin/posts/create',
    component: () => import('@/views/admin/posts/Create.vue'),
  },
  {
    path: '/admin/posts/update/:id(\\d+)',
    name: 'admin/posts/update',
    component: () => import('@/views/admin/posts/Update.vue'),
    beforeEnter: async (to) => {
      return await store.dispatch('fetchPost', to.params.id)
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/404.vue'),
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
