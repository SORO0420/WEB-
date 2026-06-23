<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>系统登录</h2>
        <p>欢迎使用后台管理系统</p>
      </div>
      <el-form :model="form" ref="formRef" label-width="80px" class="login-form">
        <el-form-item label="用户名" prop="username" :rules="usernameRule">
          <el-input 
            v-model="form.username" 
            placeholder="请输入用户名" 
            prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="passwordRule">
          <el-input 
            v-model="form.password" 
            type="password" 
            placeholder="请输入密码" 
            prefix-icon="Lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.remember">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const formRef = ref(null)

const form = reactive({
  username: '',
  password: '',
  remember: false
})

const usernameRule = [
  { required: true, message: '请输入用户名', trigger: 'blur' },
  { min: 3, max: 20, message: '用户名长度在3到20个字符', trigger: 'blur' }
]

const passwordRule = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  { min: 6, max: 20, message: '密码长度在6到20个字符', trigger: 'blur' }
]

const handleLogin = async () => {
  try {
    const valid = await formRef.value.validate()
    if (!valid) return
    
    if (form.username === 'admin' && form.password === '123456') {
      sessionStorage.setItem('token', 'mock-token')
      if (form.remember) {
        localStorage.setItem('username', form.username)
      }
      ElMessage.success('登录成功')
      router.push('/')
    } else {
      ElMessage.error('用户名或密码错误')
    }
  } catch (error) {
    console.error('login error:', error)
    ElMessage.error('登录失败，请重试')
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 400px;
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 24px;
}

.login-header p {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.login-form {
  padding: 0 20px;
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
}
</style>
