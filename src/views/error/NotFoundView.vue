<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-icon">
        <el-icon><Warning /></el-icon>
      </div>
      <h1>404</h1>
      <p>抱歉，您访问的页面不存在</p>
      <el-button type="primary" @click="goBack">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
}

.error-content {
  text-align: center;
}

.error-icon {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #e6a23c 0%, #f39c12 100%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: #fff;
}

h1 {
  font-size: 72px;
  margin: 0 0 20px 0;
  color: #303133;
}

p {
  font-size: 18px;
  color: #909399;
  margin: 0 0 30px 0;
}
</style>
