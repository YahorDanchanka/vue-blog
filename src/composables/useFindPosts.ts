import { computed } from 'vue'
import store from '@/store'

export default computed(() => {
  const query: string = store.state.search.query
  return query ? store.getters.findPosts(query) : store.state.posts
})
