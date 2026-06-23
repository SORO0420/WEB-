export const menuItems = [
  {
    path: '/',
    name: 'Dashboard',
    meta: { title: '首页工作台' },
    icon: 'Home'
  },
  {
    path: '/api-docs',
    name: 'ApiDocs',
    meta: { title: '接口文档' },
    icon: 'Document'
  },
  {
    path: '/users',
    name: 'Users',
    meta: { title: '用户管理' },
    icon: 'User',
    children: [
      { path: '/users/list', name: 'UserList', meta: { title: '用户列表' } },
      { path: '/users/add', name: 'UserAdd', meta: { title: '添加用户' } },
      { path: '/users/edit/:id', name: 'UserEdit', meta: { title: '编辑用户' } }
    ]
  },
  {
    path: '/permission',
    name: 'Permission',
    meta: { title: '权限管理' },
    icon: 'Lock'
  },
  {
    path: '/logs',
    name: 'Logs',
    meta: { title: '日志管理' },