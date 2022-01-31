<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <PostEditor :scenario="Scenario.Update" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Scenario } from '@/components/postEditor'
import PostEditor from '@/components/PostEditor.vue'
</script>
