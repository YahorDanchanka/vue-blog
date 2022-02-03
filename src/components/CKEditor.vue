<template>
  <div ref="editor" v-html="modelValue"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const editor = ref()

onMounted(async () => {
  const classicEditor = await ClassicEditor.create(editor.value)
  classicEditor.model.document.on('change:data', () => {
    emit('update:modelValue', classicEditor.getData())
  })
})
</script>
