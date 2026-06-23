<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
      <router-link v-if="item.path" :to="item.path">{{ item.name }}</router-link>
      <span v-else>{{ item.name }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const matched = route.matched
  return matched.map(item => ({
    name: item.meta.title || item.name,
    path: item.path
  }))
})
</script>

<style scoped>
.breadcrumb {
  font-size: 14px;
}
</style>
