<template>
  <div class="cart">
    <h1>Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/products" class="btn btn-primary">Continue Shopping</router-link>
    </div>

    <div v-else>
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="item._id" class="cart-item card">
          <img :src="item.image" :alt="item.name" class="cart-item-image" />
          <div class="cart-item-details">
            <h3>{{ item.name }}</h3>
            <p class="price">${{ item.price.toFixed(2) }}</p>
          </div>
          <div class="cart-item-quantity">
            <button @click="updateQuantity(item._id, item.quantity - 1)" class="btn btn-secondary">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button 
              @click="updateQuantity(item._id, item.quantity + 1)" 
              class="btn btn-secondary"
              :disabled="item.quantity >= item.stock"
            >+</button>
          </div>
          <div class="cart-item-total">
            <p class="total">${{ (item.price * item.quantity).toFixed(2) }}</p>
            <button @click="removeItem(item._id)" class="btn btn-danger">Remove</button>
          </div>
        </div>
      </div>

      <div class="cart-summary card">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Items ({{ cartStore.itemCount }}):</span>
          <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Shipping:</span>
          <span>${{ shippingCost.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (10%):</span>
          <span>${{ tax.toFixed(2) }}</span>
        </div>
        <div class="summary-row total-row">
          <strong>Total:</strong>
          <strong>${{ total.toFixed(2) }}</strong>
        </div>
        <router-link to="/checkout" class="btn btn-primary">Proceed to Checkout</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const shippingCost = computed(() => cartStore.totalPrice > 50 ? 0 : 10)
const tax = computed(() => cartStore.totalPrice * 0.1)
const total = computed(() => cartStore.totalPrice + shippingCost.value + tax.value)

const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, quantity)
}

const removeItem = (productId) => {
  cartStore.removeFromCart(productId)
}
</script>

<style scoped>
.cart h1 {
  margin-bottom: 30px;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.empty-cart p {
  font-size: 20px;
  margin-bottom: 20px;
  color: #666;
}

.cart-items {
  margin-bottom: 30px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  margin-bottom: 15px;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h3 {
  margin-bottom: 10px;
}

.price {
  font-size: 18px;
  color: #007bff;
  font-weight: bold;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity {
  font-size: 18px;
  min-width: 40px;
  text-align: center;
}

.cart-item-total {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.total {
  font-size: 20px;
  font-weight: bold;
}

.cart-summary {
  max-width: 400px;
  margin-left: auto;
  padding: 30px;
}

.cart-summary h2 {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
}

.total-row {
  border-top: 2px solid #ddd;
  padding-top: 15px;
  margin-top: 15px;
  font-size: 20px;
}

.cart-summary .btn {
  width: 100%;
  margin-top: 20px;
}
</style>
