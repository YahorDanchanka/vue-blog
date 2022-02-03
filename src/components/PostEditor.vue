<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="title-field" class="form-label">Заголовок</label>
      <input class="form-control" id="title-field" v-model="title" />
    </div>
    <div class="mb-3">
      <label class="form-label">Содержание</label>
      <div id="content-field" v-html="content"></div>
    </div>
    <button type="submit" class="btn btn-primary">{{ btnText }}</button>
  </form>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Scenario } from '@/components/postEditor'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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

let editor: ClassicEditor | undefined = undefined

if (props.scenario === Scenario.Update) {
  title.value = store.state.currentPost?.title
  content.value = store.state.currentPost?.content
}

const btnText = computed(() => (props.scenario === Scenario.Create ? 'Создать' : 'Обновить'))
const onSubmit = async () => {
  if (!editor) {
    alert('Извините, проблема с редактором. Попробуйте позже, пожалуйста')
    return
  }

  if (props.scenario === Scenario.Create) {
    const isSuccess = await store.dispatch('createPost', {
      title: title.value,
      content: editor.getData(),
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
      content: editor.getData(),
    })

    if (isSuccess) {
      await router.push({ name: 'home' })
      return
    }

    alert('Ошибка обновления записи!')
  }
}

onMounted(() => {
  ClassicEditor.create(document.querySelector('#content-field') as HTMLElement).then((newEditor) => {
    editor = newEditor
  })
})
</script>
