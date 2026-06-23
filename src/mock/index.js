import Mock from 'mockjs'

const mockUsers = Mock.mock({
  'data|10-20': [{
    id: '@id',
    name: '@cname',
    email: '@email',
    phone: /1[3-9]\d{9}/,
    status: '@boolean',
    createTime: '@datetime'
  }]
})

const mockOrders = Mock.mock({
  'data|5-10': [{
    id: /ORD\d{8}/,
    customer: '@cname',
    amount: '@float(100, 10000, 2, 2)',
    status: '@pick(["待支付", "已支付", "已发货", "已完成"])',
    createTime: '@datetime'
  }]
})

Mock.mock('/api/health', 'get', () => ({
  code: 200,
  message: 'success',
  data: {
    status: 'healthy',
    timestamp: Date.now()
  }
}))

Mock.mock('/api/reset', 'post', () => ({
  code: 200,
  message: '数据重置成功',
  data: null
}))

Mock.mock('/api/users', 'get', () => ({
  code: 200,
  message: 'success',
  data: mockUsers.data,
  total: mockUsers.data.length
}))

Mock.mock('/api/users', 'post', (options) => {
  const body = JSON.parse(options.body)
  return {
    code: 200,
    message: '用户创建成功',
    data: {
      id: Mock.mock('@id'),
      ...body,
      createTime: new Date().toISOString()
    }
  }
})

Mock.mock('/api/users/:id', 'get', (options) => {
  const id = options.url.match(/\/api\/users\/(\w+)/)[1]
  const user = mockUsers.data.find(u => u.id === id)
  if (user) {
    return {
      code: 200,
      message: 'success',
      data: user
    }
  }
  return {
    code: 404,
    message: '用户不存在',
    data: null
  }
})

Mock.mock('/api/users/:id', 'put', (options) => {
  const body = JSON.parse(options.body)
  return {
    code: 200,
    message: '用户更新成功',
    data: body
  }
})

Mock.mock('/api/users/:id', 'delete', () => ({
  code: 200,
  message: '用户删除成功',
  data: null
}))

Mock.mock('/api/orders', 'get', () => ({
  code: 200,
  message: 'success',
  data: mockOrders.data,
  total: mockOrders.data.length
}))

Mock.mock('/api/404', 'get', () => ({
  code: 404,
  message: '接口不存在',
  data: null
}))

Mock.mock('/api/500', 'get', () => ({
  code: 500,
  message: '服务器内部错误',
  data: null
}))

export default Mock
