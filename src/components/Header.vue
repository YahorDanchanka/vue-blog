<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }" class="navbar-brand">SPA Blog</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-for="link in links" class="nav-item">
            <router-link :to="link.to" class="nav-link" active-class="active">{{ link.label }}</router-link>
          </li>
        </ul>
        <form v-if="searchEnable" class="d-flex">
          <input @input="searchQuery" class="form-control me-2" type="search" placeholder="Введите запрос..." />
        </form>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { useStore } from 'vuex'
import { ILink } from '@/components/header'

const store = useStore()

const props = defineProps({
  links: {
    type: Array as PropType<ILink[]>,
    required: true,
  },
})

const searchEnable = computed(() => store.state.search.enable)
const searchQuery = (event: InputEvent) => {
  const query: string = (event.target as HTMLInputElement).value
  store.commit('setSearchQuery', query)
}
</script>
