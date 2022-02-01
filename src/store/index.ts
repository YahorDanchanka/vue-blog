import { createStore } from 'vuex'

export interface IPost {
  id: number
  title: string
  content?: string
  updated_at: number
  created_at: number
}

export interface IPostCrud {
  id?: number
  title: string
  content?: string
}

export const postsApi = 'http://api.blog.test'

export default createStore({
  state: {
    loading: false as Boolean,
    posts: [] as IPost[],
    currentPost: undefined as IPost | undefined,
    search: {
      query: '',
      enable: false,
    },
    errorStatusCode: undefined as number | undefined,
  },
  getters: {
    findPosts: (state) => (query: string) => {
      return state.posts.filter((post: IPost) => {
        return query
          .toLowerCase()
          .split(' ')
          .every((v) => post.title.toLowerCase().includes(v))
      })
    },
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
    deletePost(state, id: number | string) {
      state.posts.forEach((post, index) => {
        if (post.id == id) {
          state.posts.splice(index, 1)
        }
      })
    },
    setCurrentPost(state, payload: IPost | undefined) {
      state.currentPost = payload
    },
    setSearchQuery(state, payload: string) {
      state.search.query = payload
    },
    enableSearch(state) {
      state.search.query = ''
      state.search.enable = true
    },
    disableSearch(state) {
      state.search.enable = false
    },
    setErrorStatusCode(state, statusCode: number | undefined) {
      state.errorStatusCode = statusCode
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      commit('enableLoading')
      const response = await fetch(`${postsApi}/posts`)

      if (response.ok) {
        commit('setPosts', await response.json())
      }

      commit('disableLoading')
    },
    async fetchPost({ commit }, id: string | number): Promise<boolean> {
      commit('enableLoading')
      const response = await fetch(`${postsApi}/posts/${id}`)
      commit('disableLoading')

      if (response.ok) {
        commit('setCurrentPost', await response.json())
        return true
      }

      return false
    },
    async createPost({ commit }, payload: IPostCrud): Promise<boolean> {
      commit('enableLoading')
      const response = await fetch(`${postsApi}/posts`, {
        method: 'POST',
        body: new URLSearchParams(payload as any),
      })
      commit('disableLoading')

      return response.ok
    },
    async updatePost({ commit }, payload: IPostCrud): Promise<boolean> {
      commit('enableLoading')
      const response = await fetch(`${postsApi}/posts/${payload.id}`, {
        method: 'PUT',
        body: new URLSearchParams(payload as any),
      })
      commit('disableLoading')
      return response.ok
    },
    async deletePost({ commit }, id: number | string): Promise<boolean> {
      commit('enableLoading')
      const response = await fetch(`${postsApi}/posts/${id}`, { method: 'DELETE' })
      commit('disableLoading')

      if (response.ok) {
        commit('deletePost', id)
        return true
      }

      return false
    },
  },
})
