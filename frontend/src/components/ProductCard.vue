<template>
  <div class="product-card">
    <router-link :to="`/products/${product._id}`" class="product-link">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">${{ product.price.toFixed(2) }}</p>
        <p class="product-stock" :class="{ 'out-of-stock': product.stock === 0 }">
          {{ product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock' }}
        </p>
      </div>
    </router-link>
    <button 
      @click="addToCart" 
      :disabled="product.stock === 0"
      class="btn btn-primary add-to-cart"
    >
      {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const addToCart = () => {
  if (props.product.stock > 0) {
    cartStore.addToCart(props.product, 1)
  }
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-name {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.product-price {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 8px;
}

.product-stock {
  font-size: 14px;
  color: #28a745;
}

.product-stock.out-of-stock {
  color: #dc3545;
}

.add-to-cart {
  width: 100%;
  border-radius: 0;
  padding: 12px;
}

.add-to-cart:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
