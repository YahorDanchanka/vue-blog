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

<style lang="sass">
img
  max-width: 100%
  height: auto
</style>
