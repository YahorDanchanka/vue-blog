<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text" v-html="post.content"></p>
      <router-link :to="{ name: 'posts/view', params: { id: post.id } }" class="btn btn-primary"> Читать </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { IPost } from '@/store'

const props = defineProps({
  post: {
    type: Object as PropType<IPost>,
    required: true,
  },
})
</script>
