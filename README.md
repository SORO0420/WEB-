# 后台管理系统

基于 Vue 3 + Element Plus + Vite 构建的企业级后台管理系统。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 6
- **UI组件库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **模拟数据**: Mock.js

## 项目结构

```
├── src/
│   ├── layout/          # 布局组件
│   ├── views/           # 页面组件
│   │   ├── login/       # 登录页
│   │   ├── dashboard/   # 首页工作台
│   │   ├── api-docs/    # 接口文档页
│   │   └── error/       # 错误页面
│   ├── router/          # 路由配置
│   ├── mock/            # 模拟接口
│   ├── App.vue          # 根组件
│   ├── main.js          # 入口文件
│   └── style.css        # 全局样式
├── index.html           # HTML模板
├── vite.config.js       # Vite配置
└── package.json         # 项目依赖
```

## 功能特性

- ✅ 企业后台常见布局（侧边栏、顶部栏、面包屑）
- ✅ 登录页面与路由守卫
- ✅ 首页工作台（数据统计卡片、图表展示、快捷操作）
- ✅ 接口文档页面（在线接口调试）
- ✅ Mock数据模拟接口
- ✅ 403/404错误页面

## 安装与运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 登录信息

- **用户名**: admin
- **密码**: 123456

## 接口文档

访问 `/api-docs` 页面可以查看所有可用的模拟接口，并支持在线发送请求测试。

## 项目配置

### 端口配置

在 `vite.config.js` 中修改 `server.port` 配置项。

### Mock接口

模拟接口定义在 `src/mock/index.js` 文件中。

## License

MIT
