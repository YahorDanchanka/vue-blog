<template>
  <component :is="layout" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/views/layouts/Main.vue'

const route = useRoute()

const layout = computed(() => {
  /** if (route.meta.layout === 'empty') {
    return EmptyLayout
  } */

  return MainLayout
})
</script>
