<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="logo">
      <h2 v-if="!isCollapsed">后台管理</h2>
      <span v-else>管理</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      mode="vertical"
      background-color="#2f4050"
      text-color="#a7b1c2"
      active-text-color="#fff"
      :collapse="isCollapsed"
      @select="handleMenuSelect"
    >
      <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
        <template #icon>
          <el-icon :component="item.icon" />
        </template>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu v-for="item in subMenuItems" :key="item.path" :index="item.path">
        <template #title>
          <el-icon :component="item.icon" />
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
          {{ child.name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isCollapsed = ref(false)

const menuItems = [
  { path: '/', name: '首页工作台', icon: 'Home' },
  { path: '/api-docs', name: '接口文档', icon: 'Document' }
]

const subMenuItems = [
  {
    path: '1',
    name: '系统设置',
    icon: 'Setting',
    children: [
      { path: '/users', name: '用户管理' },
      { path: '/permission', name: '权限管理' },
      { path: '/logs', name: '日志管理' }
    ]
  }
]

const activeMenu = computed(() => {
  return route.path
})

const handleMenuSelect = (index) => {
  if (index === '/' || index === '/api-docs') {
    router.push(index)
  }
}

defineExpose({ isCollapsed })
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: #2f4050;
  z-index: 100;
  overflow-y: auto;
  transition: width 0.3s;
  width: 200px;
}

.sidebar.collapsed {
  width: 64px;
}

.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #233140;
  color: #fff;
  font-size: 16px;
}

.sidebar-menu {
  border-right: none;
}
</style>
