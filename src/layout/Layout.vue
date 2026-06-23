<template>
  <div class="layout-container">
    <Sidebar ref="sidebarRef" />
    <div class="main-wrapper">
      <HeaderBar @collapse="handleCollapse" />
      <main class="content-wrapper">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import HeaderBar from './components/HeaderBar.vue'

const sidebarRef = ref(null)

const handleCollapse = () => {
  if (sidebarRef.value) {
    sidebarRef.value.isCollapsed = !sidebarRef.value.isCollapsed
  }
}
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  transition: margin-left 0.3s;
}

.content-wrapper {
  flex: 1;
  padding: 20px;
  margin-top: 60px;
  background: #f5f7fa;
  overflow-y: auto;
}
</style>
