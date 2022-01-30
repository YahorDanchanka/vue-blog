<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-lg-12">
        <Post v-if="post" :post="post" />
        <div v-else class="alert alert-danger">Запись не найдена</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IPost } from '@/store'
import Post from '@/components/Post.vue'

const route = useRoute()
const store = useStore()

const post = computed<IPost | undefined>(() => store.state.currentPost)
</script>
