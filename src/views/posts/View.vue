<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <Post v-if="post" :post="post" :scenario="Scenario.Single" />
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
import { Scenario } from '@/components/post'

const route = useRoute()
const store = useStore()

const post = computed<IPost | undefined>(() => store.state.currentPost)
</script>
