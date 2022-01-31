<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <router-link :to="{ name: 'admin/posts/create' }" class="btn btn-primary mb-3">Создать</router-link>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Заголовок</th>
                <th scope="col">Содержание</th>
                <th scope="col">Дата обновления</th>
                <th scope="col">Дата создания</th>
                <th scope="col">Действия</th>
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
                  <td>
                    <router-link :to="{ name: 'posts/view', params: { id: post.id } }" class="me-1">
                      <i class="bi bi-eye"></i>
                    </router-link>
                    <router-link :to="{ name: 'admin/posts/update', params: { id: post.id } }" class="me-1">
                      <i class="bi bi-pencil"></i>
                    </router-link>
                    <a @click.prevent="deletePost(post.id)" href="#"><i class="bi bi-trash"></i></a>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="6">Не найдено</td>
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

const deletePost = (id: number | string) => {
  store.dispatch('deletePost', id)
}
</script>
