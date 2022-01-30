<template>
  <div class="container mt-3">
    <div class="row gy-3">
      <div v-for="post in posts" class="col-lg-4">
        <Post :post="post" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Post from '@/components/Post.vue'

const store = useStore()

store.dispatch('fetchPosts')

const posts = computed(() => store.state.posts)
</script>
