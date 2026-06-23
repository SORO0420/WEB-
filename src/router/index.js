import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../layout/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/dashboard/DashboardView.vue')
      },
      {
        path: '/api-docs',
        name: 'ApiDocs',
        component: () => import('../views/api-docs/ApiDocsView.vue')
      },
      {
        path: '/403',
        name: 'Forbidden',
        component: () => import('../views/error/ForbiddenView.vue')
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/error/NotFoundView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  console.log('router beforeEach:', { to: to.path, from: from.path, token: !!token })
  
  if (to.path === '/login') {
    if (token) {
      console.log('already logged in, redirecting to /')
      next('/')
    } else {
      next()
    }
  } else {
    if (token) {
      next()
    } else {
      console.log('not logged in, redirecting to /login')
      next('/login')
    }
  }
})

export default router
