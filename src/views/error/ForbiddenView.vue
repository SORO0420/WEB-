<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-icon">
        <el-icon><Lock /></el-icon>
      </div>
      <h1>403</h1>
      <p>抱歉，您没有访问该页面的权限</p>
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
  background: linear-gradient(135deg, #f56c6c 0%, #feb47b 100%);
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
