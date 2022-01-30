import { createStore } from 'vuex'

export interface IPost {
  id: number
  title: string
  content?: string
  updated_at: string
  created_at: string
}

export const postsApi = 'http://api.blog.test'

export default createStore({
  state: {
    loading: false as Boolean,
    posts: [] as IPost[],
    currentPost: undefined as IPost | undefined,
  },
  mutations: {
    enableLoading(state) {
      state.loading = true
    },
    disableLoading(state) {
      state.loading = false
    },
    setPosts(state, payload: IPost[]) {
      state.posts = payload
    },
    setCurrentPost(state, payload: IPost | undefined) {
      state.currentPost = payload
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      const response = await fetch(`${postsApi}/posts`)
      commit('enableLoading')

      if (response.ok) {
        commit('setPosts', await response.json())
        commit('disableLoading')
      }

      commit('disableLoading')
    },
    async fetchPost({ commit }, id: string | number) {
      const response = await fetch(`${postsApi}/posts/${id}`)
      commit('enableLoading')

      if (response.ok) {
        commit('setCurrentPost', await response.json())
        commit('disableLoading')
      }

      commit('disableLoading')
    },
  },
})
