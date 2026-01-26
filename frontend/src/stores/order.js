import { defineStore } from 'pinia'
import { orderService } from '@/services'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
  }),

  actions: {
    async createOrder(orderData) {
      this.loading = true
      this.error = null
      try {
        const response = await orderService.createOrder(orderData)
        this.currentOrder = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create order'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchOrder(id) {
      this.loading = true
      this.error = null
      try {
        const response = await orderService.getOrder(id)
        this.currentOrder = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch order'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchMyOrders() {
      this.loading = true
      this.error = null
      try {
        const response = await orderService.getMyOrders()
        this.orders = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch orders'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateOrderToPaid(id, paymentResult) {
      this.loading = true
      this.error = null
      try {
        const response = await orderService.updateOrderToPaid(id, paymentResult)
        this.currentOrder = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update order'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
