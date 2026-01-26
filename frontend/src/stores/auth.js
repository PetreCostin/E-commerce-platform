import { defineStore } from 'pinia'
import { authService } from '@/services'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    async register(userData) {
      this.loading = true
      this.error = null
      try {
        const response = await authService.register(userData)
        this.user = response.data
        this.token = response.data.token
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('token', response.data.token)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const response = await authService.login(credentials)
        this.user = response.data
        this.token = response.data.token
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('token', response.data.token)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },

    async getProfile() {
      this.loading = true
      this.error = null
      try {
        const response = await authService.getProfile()
        this.user = { ...this.user, ...response.data }
        localStorage.setItem('user', JSON.stringify(this.user))
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch profile'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProfile(userData) {
      this.loading = true
      this.error = null
      try {
        const response = await authService.updateProfile(userData)
        this.user = response.data
        this.token = response.data.token
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('token', response.data.token)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update profile'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
