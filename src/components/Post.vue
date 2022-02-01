<template>
  <div class="card">
    <div class="card-body">
      <h1 v-if="scenario === Scenario['Single']" class="card-title">{{ post.title }}</h1>
      <h5 v-else class="card-title">{{ post.title }}</h5>
      <p class="card-text" v-html="content"></p>
      <router-link
        v-if="scenario === Scenario['List']"
        :to="{ name: 'posts/view', params: { id: post.id } }"
        class="btn btn-primary"
      >
        Читать
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from 'vue'
import { IPost } from '@/store'
import { Scenario } from '@/components/post'
import { encode, cut } from '@/api/app/strings'

const props = defineProps({
  post: {
    type: Object as PropType<IPost>,
    required: true,
  },
  scenario: {
    type: Number as PropType<Scenario>,
    default: Scenario.List,
  },
})

const content = computed(() => {
  if (props.scenario === Scenario.List && props.post.content) {
    return cut(encode(props.post.content))
    // return encode(props.post.content)
  }

  return props.post.content
})
</script>
