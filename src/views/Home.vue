<template>
  <div class="container mt-3">
    <div class="row gy-3">
      <div v-for="post in posts" class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text" v-html="post.content"></p>
            <a href="#" class="btn btn-primary">Читать</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

store.dispatch('fetchPosts')

const posts = computed(() => store.state.posts)
</script>
