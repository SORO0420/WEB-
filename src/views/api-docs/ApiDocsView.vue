<template>
  <div class="api-docs">
    <div class="docs-header">
      <h1>接口文档</h1>
      <p>在线接口调试工具</p>
    </div>

    <div class="docs-container">
      <div class="api-list">
        <el-card title="接口列表">
          <el-tree
            :data="apiTree"
            :props="treeProps"
            @node-click="handleNodeClick"
            class="api-tree"
          ></el-tree>
        </el-card>
      </div>

      <div class="api-detail">
        <el-card v-if="selectedApi" :title="selectedApi.name">
          <div class="api-info">
            <div class="method-badge" :class="selectedApi.method.toLowerCase()">
              {{ selectedApi.method }}
            </div>
            <span class="api-path">{{ selectedApi.path }}</span>
          </div>

          <div class="api-description">{{ selectedApi.description }}</div>

          <el-tabs type="border-card">
            <el-tab-pane label="请求参数">
              <div v-if="selectedApi.params && selectedApi.params.length > 0">
                <el-table :data="selectedApi.params" border>
                  <el-table-column prop="name" label="参数名"></el-table-column>
                  <el-table-column prop="type" label="类型"></el-table-column>
                  <el-table-column prop="required" label="必填"></el-table-column>
                  <el-table-column prop="description" label="说明"></el-table-column>
                </el-table>
              </div>
              <p v-else class="empty-hint">该接口无请求参数</p>
            </el-tab-pane>

            <el-tab-pane label="请求示例">
              <pre>{{ selectedApi.requestExample }}</pre>
            </el-tab-pane>

            <el-tab-pane label="响应示例">
              <pre>{{ selectedApi.responseExample }}</pre>
            </el-tab-pane>
          </el-tabs>

          <div class="api-actions">
            <el-button type="primary" @click="sendRequest">发送请求</el-button>
          </div>

          <div v-if="responseData" class="response-section">
            <h3>响应结果</h3>
            <pre class="response-result">{{ formatResponse(responseData) }}</pre>
          </div>
        </el-card>

        <el-card v-else>
          <div class="empty-state">
            <el-icon class="empty-icon"><Document /></el-icon>
            <p>请选择一个接口查看详情</p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const selectedApi = ref(null)
const responseData = ref(null)

const apiTree = reactive([
  {
    id: 'system',
    label: '系统接口',
    children: [
      {
        id: 'health',
        label: '健康检查',
        name: '健康检查接口',
        method: 'GET',
        path: '/api/health',
        description: '检查服务健康状态',
        params: [],
        requestExample: '{}',
        responseExample: '{\n  "code": 200,\n  "message": "success",\n  "data": {\n    "status": "healthy",\n    "timestamp": 1704067200000\n  }\n}'
      },
      {
        id: 'reset',
        label: '数据重置',
        name: '数据重置接口',
        method: 'POST',
        path: '/api/reset',
        description: '重置所有模拟数据',
        params: [],
        requestExample: '{}',
        responseExample: '{\n  "code": 200,\n  "message": "数据重置成功",\n  "data": null\n}'
      }
    ]
  },
  {
    id: 'users',
    label: '用户管理',
    children: [
      {
        id: 'users-list',
        label: '获取用户列表',
        name: '获取用户列表',
        method: 'GET',
        path: '/api/users',
        description: '获取所有用户信息列表',
        params: [],
        requestExample: '{}',
        responseExample: '{\n  "code": 200,\n  "message": "success",\n  "data": [...],\n  "total": 15\n}'
      },
      {
        id: 'users-create',
        label: '创建用户',
        name: '创建用户',
        method: 'POST',
        path: '/api/users',
        description: '创建新用户',
        params: [
          { name: 'name', type: 'string', required: '是', description: '用户名' },
          { name: 'email', type: 'string', required: '是', description: '邮箱' },
          { name: 'phone', type: 'string', required: '否', description: '手机号' }
        ],
        requestExample: '{\n  "name": "张三",\n  "email": "zhangsan@example.com",\n  "phone": "13800138000"\n}',
        responseExample: '{\n  "code": 200,\n  "message": "用户创建成功",\n  "data": {\n    "id": "123456",\n    "name": "张三",\n    "email": "zhangsan@example.com",\n    "phone": "13800138000",\n    "createTime": "2024-01-01T00:00:00.000Z"\n  }\n}'
      },
      {
        id: 'users-detail',
        label: '获取用户详情',
        name: '获取用户详情',
        method: 'GET',
        path: '/api/users/:id',
        description: '根据ID获取用户详情',
        params: [
          { name: 'id', type: 'string', required: '是', description: '用户ID' }
        ],
        requestExample: 'GET /api/users/123456',
        responseExample: '{\n  "code": 200,\n  "message": "success",\n  "data": {\n    "id": "123456",\n    "name": "张三",\n    "email": "zhangsan@example.com",\n    "phone": "13800138000",\n    "status": true,\n    "createTime": "2024-01-01T00:00:00.000Z"\n  }\n}'
      },
      {
        id: 'users-update',
        label: '更新用户',
        name: '更新用户',
        method: 'PUT',
        path: '/api/users/:id',
        description: '更新用户信息',
        params: [
          { name: 'id', type: 'string', required: '是', description: '用户ID' },
          { name: 'name', type: 'string', required: '否', description: '用户名' },
          { name: 'email', type: 'string', required: '否', description: '邮箱' }
        ],
        requestExample: '{\n  "name": "李四",\n  "email": "lisi@example.com"\n}',
        responseExample: '{\n  "code": 200,\n  "message": "用户更新成功",\n  "data": {\n    "id": "123456",\n    "name": "李四",\n    "email": "lisi@example.com"\n  }\n}'
      },
      {
        id: 'users-delete',
        label: '删除用户',
        name: '删除用户',
        method: 'DELETE',
        path: '/api/users/:id',
        description: '删除指定用户',
        params: [
          { name: 'id', type: 'string', required: '是', description: '用户ID' }
        ],
        requestExample: 'DELETE /api/users/123456',
        responseExample: '{\n  "code": 200,\n  "message": "用户删除成功",\n  "data": null\n}'
      }
    ]
  },
  {
    id: 'orders',
    label: '订单管理',
    children: [
      {
        id: 'orders-list',
        label: '获取订单列表',
        name: '获取订单列表',
        method: 'GET',
        path: '/api/orders',
        description: '获取所有订单列表',
        params: [],
        requestExample: '{}',
        responseExample: '{\n  "code": 200,\n  "message": "success",\n  "data": [...],\n  "total": 8\n}'
      }
    ]
  },
  {
    id: 'error',
    label: '异常测试',
    children: [
      {
        id: 'error-404',
        label: '404错误',
        name: '404错误接口',
        method: 'GET',
        path: '/api/404',
        description: '测试404错误响应',
        params: [],
        requestExample: '{}',
        responseExample: '{\n  "code": 404,\n  "message": "接口不存在",\n  "data": null\n}'
      },
      {
        id: 'error-500',
        label: '500错误',
        name: '500错误接口',
        method: 'GET',
        path: '/api/500',
        description: '测试500错误响应',
        params: [],
        requestExample: '{}',
        responseExample: '{\n  "code": 500,\n  "message": "服务器内部错误",\n  "data": null\n}'
      }
    ]
  }
])

const treeProps = {
  children: 'children',
  label: 'label'
}

const handleNodeClick = (data) => {
  if (data.method) {
    selectedApi.value = data
    responseData.value = null
  }
}

const sendRequest = async () => {
  if (!selectedApi.value) return
  
  try {
    const url = selectedApi.value.path.replace('/:id', '/mock-id-123')
    const options = {
      method: selectedApi.value.method,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    if (selectedApi.value.method === 'POST' || selectedApi.value.method === 'PUT') {
      options.body = '{}'
    }
    
    const response = await fetch(url, options)
    const result = await response.json()
    responseData.value = result
    ElMessage.success('请求成功')
  } catch (error) {
    ElMessage.error('请求失败: ' + error.message)
  }
}

const formatResponse = (data) => {
  return JSON.stringify(data, null, 2)
}
</script>

<style scoped>
.api-docs {
  padding: 20px;
}

.docs-header {
  margin-bottom: 30px;
}

.docs-header h1 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 24px;
}

.docs-header p {
  margin: 0;
  color: #909399;
}

.docs-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
}

.api-tree {
  max-height: 600px;
  overflow-y: auto;
}

.api-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.method-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.method-badge.get {
  background: #67c23a;
}

.method-badge.post {
  background: #409eff;
}

.method-badge.put {
  background: #e6a23c;
}

.method-badge.delete {
  background: #f56c6c;
}

.api-path {
  font-family: monospace;
  color: #606266;
}

.api-description {
  color: #909399;
  margin-bottom: 20px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;
}

.api-actions {
  margin-top: 20px;
}

.response-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #dcdfe6;
}

.response-section h3 {
  margin: 0 0 12px 0;
  color: #303133;
}

.response-result {
  background: #1f1f1f;
  color: #e6e6e6;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: monospace;
}

.empty-hint {
  text-align: center;
  color: #909399;
  padding: 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 48px;
  color: #c0c4cc;
  margin-bottom: 16px;
}

.empty-state p {
  color: #909399;
}

@media (max-width: 768px) {
  .docs-container {
    grid-template-columns: 1fr;
  }
}
</style>
