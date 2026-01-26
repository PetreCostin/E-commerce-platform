<template>
  <div class="product-detail">
    <div v-if="loading" class="loading">Loading product...</div>

    <div v-else-if="product" class="product-container">
      <div class="product-image-section">
        <img :src="product.image" :alt="product.name" class="product-image" />
      </div>

      <div class="product-info-section">
        <h1>{{ product.name }}</h1>
        
        <div class="product-meta">
          <div class="price">${{ product.price.toFixed(2) }}</div>
          <div class="stock" :class="{ 'out-of-stock': product.stock === 0 }">
            {{ product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock' }}
          </div>
        </div>

        <div class="product-description">
          <h2>Description</h2>
          <p>{{ product.description }}</p>
        </div>

        <div class="product-details">
          <div class="detail-row">
            <span class="label">Category:</span>
            <span class="value">{{ product.category }}</span>
          </div>
          <div class="detail-row" v-if="product.rating">
            <span class="label">Rating:</span>
            <span class="value">{{ product.rating }}/5 ({{ product.numReviews }} reviews)</span>
          </div>
        </div>

        <div class="product-actions">
          <div class="quantity-selector">
            <label for="quantity">Quantity:</label>
            <select id="quantity" v-model="quantity" :disabled="product.stock === 0">
              <option v-for="n in Math.min(product.stock, 10)" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>

          <button
            @click="addToCart"
            :disabled="product.stock === 0"
            class="btn btn-primary"
          >
            {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
          </button>

          <router-link to="/products" class="btn btn-secondary">Back to Products</router-link>
        </div>
      </div>
    </div>

    <div v-else class="error">Product not found</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(true)
const quantity = ref(1)

onMounted(async () => {
  try {
    product.value = await productStore.fetchProduct(route.params.id)
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    loading.value = false
  }
})

const addToCart = () => {
  if (product.value && product.value.stock > 0) {
    cartStore.addToCart(product.value, quantity.value)
    router.push('/cart')
  }
}
</script>

<style scoped>
.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 20px;
}

.product-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
}

.product-info-section h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.product-meta {
  margin-bottom: 30px;
}

.price {
  font-size: 36px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
}

.stock {
  font-size: 18px;
  color: #28a745;
  font-weight: 500;
}

.stock.out-of-stock {
  color: #dc3545;
}

.product-description {
  margin-bottom: 30px;
}

.product-description h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

.product-description p {
  line-height: 1.6;
  color: #666;
}

.product-details {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
}

.detail-row {
  display: flex;
  margin-bottom: 10px;
}

.detail-row .label {
  font-weight: 600;
  margin-right: 10px;
  min-width: 100px;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-selector label {
  font-weight: 500;
}

.quantity-selector select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
  }
}
</style>
