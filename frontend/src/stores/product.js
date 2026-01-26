import { defineStore } from 'pinia'
import { productService } from '@/services'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      pages: 1,
      total: 0
    }
  }),

  actions: {
    async fetchProducts(params = {}) {
      this.loading = true
      this.error = null
      try {
        const response = await productService.getProducts(params)
        this.products = response.data.products
        this.pagination = {
          page: response.data.page,
          pages: response.data.pages,
          total: response.data.total
        }
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch products'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchProduct(id) {
      this.loading = true
      this.error = null
      try {
        const response = await productService.getProduct(id)
        this.currentProduct = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch product'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createProduct(productData) {
      this.loading = true
      this.error = null
      try {
        const response = await productService.createProduct(productData)
        this.products.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create product'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProduct(id, productData) {
      this.loading = true
      this.error = null
      try {
        const response = await productService.updateProduct(id, productData)
        const index = this.products.findIndex(p => p._id === id)
        if (index !== -1) {
          this.products[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update product'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id) {
      this.loading = true
      this.error = null
      try {
        await productService.deleteProduct(id)
        this.products = this.products.filter(p => p._id !== id)
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete product'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
