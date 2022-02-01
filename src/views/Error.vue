<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <template v-if="errorStatusCode === 404">
          <h1>Страница не найдена</h1>
          <div class="alert alert-danger">Ошибка #404, Not Found</div>
        </template>
        <template v-else>
          <h1>Внутренняя ошибка сервера</h1>
          <div class="alert alert-danger">Ошибка #500, Internal Server Error</div>
        </template>
        <p>Указанная выше ошибка возникла во время обработки веб-сервером вашего запроса.</p>
        <p>Пожалуйста, свяжитесь с нами, если вы считаете, что это ошибка сервера. Спасибо.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const errorStatusCode = computed(() => store.state.errorStatusCode)
</script>
