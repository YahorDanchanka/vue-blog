<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="title-field" class="form-label">Заголовок</label>
      <input class="form-control" id="title-field" v-model="title" />
    </div>
    <div class="mb-3">
      <label for="content-field" class="form-label">Содержание</label>
      <textarea id="content-field" class="form-control" v-model="content"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">{{ btnText }}</button>
  </form>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Scenario } from '@/components/postEditor'

const props = defineProps({
  scenario: {
    type: Number as PropType<Scenario>,
    default: Scenario.Create,
  },
})

const store = useStore()
const router = useRouter()

const title = ref('')
const content = ref('')

const btnText = computed(() => (props.scenario === Scenario.Create ? 'Создать' : 'Обновить'))
const onSubmit = async () => {
  if (props.scenario === Scenario.Create) {
    const isSuccess = await store.dispatch('createPost', {
      title: title.value,
      content: content.value,
    })

    if (isSuccess) {
      await router.push({ name: 'home' })
      return
    }

    alert('Ошибка создания записи!')
  }
}
</script>
