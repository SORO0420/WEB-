<template>
  <header class="header">
    <div class="header-left">
      <el-button 
        class="collapse-btn" 
        @click="handleCollapse" 
        icon="Menu"
      ></el-button>
      <Breadcrumb />
    </div>
    <div class="header-right">
      <el-button icon="Bell" class="header-btn"></el-button>
      <el-dropdown>
        <span class="user-info">
          <el-icon :component="'User'" />
          <span>管理员</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Breadcrumb from './Breadcrumb.vue'

const router = useRouter()

const emit = defineEmits(['collapse'])

const handleCollapse = () => {
  emit('collapse')
}

const handleLogout = () => {
  sessionStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #dcdfe6;
  position: fixed;
  right: 0;
  top: 0;
  width: calc(100% - 200px);
  z-index: 99;
  transition: width 0.3s;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.collapse-btn {
  border: none;
  background: transparent;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-btn {
  border: none;
  background: transparent;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #606266;
}
</style>