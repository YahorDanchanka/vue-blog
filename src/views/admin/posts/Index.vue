<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Заголовок</th>
                <th scope="col">Содержание</th>
                <th scope="col">Дата обновления</th>
                <th scope="col">Дата создания</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="posts.length">
                <tr v-for="post in posts">
                  <th scope="row">{{ post.id }}</th>
                  <td>{{ post.title }}</td>
                  <td>{{ post.content }}</td>
                  <td>{{ formatDate(post.updated_at) }}</td>
                  <td>{{ formatDate(post.created_at) }}</td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="5">Не найдено</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import useFindPosts from '@/composables/useFindPosts'

const store = useStore()

store.commit('enableSearch')

const posts = useFindPosts

const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleString()
</script>
