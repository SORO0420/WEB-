<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>欢迎回来，管理员</h1>
      <p>{{ currentDate }}</p>
    </div>
    
    <div class="stats-card">
      <div class="stat-item">
        <el-card class="stat-card">
          <div class="stat-icon user-icon">
            <el-icon><User /></el-icon>
          </div>
          <div class="stat-info">
            <p class="stat-value">{{ stats.users }}</p>
            <p class="stat-label">用户总数</p>
          </div>
        </el-card>
      </div>
      <div class="stat-item">
        <el-card class="stat-card">
          <div class="stat-icon order-icon">
            <el-icon><ShoppingCart /></el-icon>
          </div>
          <div class="stat-info">
            <p class="stat-value">{{ stats.orders }}</p>
            <p class="stat-label">今日订单</p>
          </div>
        </el-card>
      </div>
      <div class="stat-item">
        <el-card class="stat-card">
          <div class="stat-icon revenue-icon">
            <el-icon><Wallet /></el-icon>
          </div>
          <div class="stat-info">
            <p class="stat-value">¥{{ stats.revenue }}</p>
            <p class="stat-label">今日收入</p>
          </div>
        </el-card>
      </div>
      <div class="stat-item">
        <el-card class="stat-card">
          <div class="stat-icon growth-icon">
            <el-icon><TrendingUp /></el-icon>
          </div>
          <div class="stat-info">
            <p class="stat-value">{{ stats.growth }}%</p>
            <p class="stat-label">增长率</p>
          </div>
        </el-card>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="chart-section">
        <el-card title="访问量趋势">
          <div class="chart-container">
            <div class="chart-bar">
              <div class="bar-item" style="height: 40%">
                <span>周一</span>
              </div>
              <div class="bar-item" style="height: 65%">
                <span>周二</span>
              </div>
              <div class="bar-item" style="height: 50%">
                <span>周三</span>
              </div>
              <div class="bar-item" style="height: 80%">
                <span>周四</span>
              </div>
              <div class="bar-item" style="height: 70%">
                <span>周五</span>
              </div>
              <div class="bar-item" style="height: 90%">
                <span>周六</span>
              </div>
              <div class="bar-item" style="height: 75%">
                <span>周日</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <div class="quick-section">
        <el-card title="快捷操作">
          <div class="quick-actions">
            <el-button type="primary" icon="Plus">新建用户</el-button>
            <el-button icon="Upload">导入数据</el-button>
            <el-button icon="Download">导出报告</el-button>
            <el-button icon="Refresh">刷新数据</el-button>
          </div>
        </el-card>

        <el-card title="最近动态">
          <el-timeline>
            <el-timeline-item timestamp="10:30" placement="top">
              <p>管理员登录系统</p>
            </el-timeline-item>
            <el-timeline-item timestamp="09:15" placement="top">
              <p>新增订单 #20240101</p>
            </el-timeline-item>
            <el-timeline-item timestamp="08:00" placement="top">
              <p>系统自动备份完成</p>
            </el-timeline-item>
            <el-timeline-item timestamp="昨天" placement="top">
              <p>用户张三注册成功</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const stats = ref({
  users: 1284,
  orders: 85,
  revenue: 12560.50,
  growth: 12.5
})

const currentDate = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekDay = weekDays[now.getDay()]
  return `${year}年${month}月${day}日 ${weekDay}`
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.dashboard-header {
  margin-bottom: 30px;
}

.dashboard-header h1 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 24px;
}

.dashboard-header p {
  margin: 0;
  color: #909399;
}

.stats-card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}

.user-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.order-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: #fff;
}

.revenue-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: #fff;
}

.growth-icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: #fff;
}

.stat-info {
  flex: 1;
}

.stat-value {
  margin: 0 0 5px 0;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.stat-label {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.chart-container {
  padding: 20px;
}

.chart-bar {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 200px;
  padding-top: 20px;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px 8px 0 0;
  color: #fff;
  font-size: 12px;
  transition: height 0.3s;
}

.bar-item span {
  margin-top: 10px;
  color: #909399;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.el-timeline {
  padding-left: 0;
}

@media (max-width: 1200px) {
  .stats-card {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-card {
    grid-template-columns: 1fr;
  }
}
</style>
