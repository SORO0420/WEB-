import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarCollapsed: false,
    token: '',
    userInfo: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    setSidebarCollapsed(collapsed) {
      this.sidebarCollapsed = collapsed
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },

    setToken(token) {
      this.token = token
      sessionStorage.setItem('token', token)
    },

    getToken() {
      this.token = sessionStorage.getItem('token') || ''
      return this.token
    },

    clearToken() {
      this.token = ''
      sessionStorage.removeItem('token')
    },

    setUserInfo(user) {
      this.userInfo = user
    },

    logout() {
      this.clearToken()
      this.userInfo = null
    }
  }
})

