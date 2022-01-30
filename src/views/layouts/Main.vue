<template>
  <Header :links="links" />
  <router-view />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ILink } from '@/components/header'
import Header from '@/components/Header.vue'

const links = computed<ILink[]>(() => [
  { label: 'Главная', to: { name: 'home' } },
  { label: 'Записи', to: { name: 'admin/posts/index' } },
])
</script>
