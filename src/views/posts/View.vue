<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ post?.title }}</h5>
            <p class="card-text" v-html="post?.content"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IPost } from '@/store'

const route = useRoute()
const store = useStore()

const post = computed<IPost | undefined>(() => store.state.currentPost)
</script>
