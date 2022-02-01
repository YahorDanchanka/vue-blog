<template>
  <div class="container mb-3">
    <div class="row gy-3">
      <template v-if="posts.length">
        <div v-for="post in posts" class="col-lg-4">
          <Post :post="post" />
        </div>
      </template>
      <div v-else class="col-lg-12">
        <h1>Записи не найдены</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Post from '@/components/Post.vue'
import useFindPosts from '@/composables/useFindPosts'

const posts = useFindPosts
</script>
