<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="title-field" class="form-label">Заголовок</label>
      <input class="form-control" id="title-field" v-model="title" />
    </div>
    <div class="mb-3">
      <label class="form-label">Содержание</label>
      <CKEditor v-model="content" />
    </div>
    <button type="submit" class="btn btn-primary">{{ btnText }}</button>
  </form>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Scenario } from '@/components/postEditor'
import CKEditor from '@/components/CKEditor.vue'

const props = defineProps({
  scenario: {
    type: Number as PropType<Scenario>,
    default: Scenario.Create,
  },
})

const store = useStore()
const router = useRouter()
const route = useRoute()

const title = ref('')
const content = ref('')

if (props.scenario === Scenario.Update) {
  title.value = store.state.currentPost?.title
  content.value = store.state.currentPost?.content
}

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
  } else if (props.scenario === Scenario.Update) {
    const isSuccess = await store.dispatch('updatePost', {
      id: route.params.id,
      title: title.value,
      content: content.value,
    })

    if (isSuccess) {
      await router.push({ name: 'home' })
      return
    }

    alert('Ошибка обновления записи!')
  }
}
</script>
