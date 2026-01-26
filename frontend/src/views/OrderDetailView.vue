<template>
  <div class="order-detail">
    <div v-if="loading" class="loading">Loading order...</div>

    <div v-else-if="order">
      <h1>Order #{{ order._id.slice(-8) }}</h1>

      <div class="order-info">
        <div class="card">
          <h2>Order Information</h2>
          <div class="info-row">
            <span class="label">Order ID:</span>
            <span>{{ order._id }}</span>
          </div>
          <div class="info-row">
            <span class="label">Date:</span>
            <span>{{ new Date(order.createdAt).toLocaleString() }}</span>
          </div>
          <div class="info-row">
            <span class="label">Status:</span>
            <span class="status-badge" :class="order.status">{{ order.status }}</span>
          </div>
          <div class="info-row">
            <span class="label">Payment Status:</span>
            <span v-if="order.isPaid" class="paid-badge">Paid on {{ new Date(order.paidAt).toLocaleDateString() }}</span>
            <span v-else class="unpaid-badge">Not Paid</span>
          </div>
        </div>

        <div class="card">
          <h2>Shipping Address</h2>
          <p>{{ order.shippingAddress.street }}</p>
          <p>{{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.zipCode }}</p>
          <p>{{ order.shippingAddress.country }}</p>
        </div>

        <div class="card">
          <h2>Payment Method</h2>
          <p>{{ order.paymentMethod }}</p>
        </div>
      </div>

      <div class="card order-items">
        <h2>Order Items</h2>
        <div class="items-list">
          <div v-for="item in order.orderItems" :key="item._id" class="order-item">
            <div class="item-info">
              <strong>{{ item.name }}</strong>
              <span class="quantity">Quantity: {{ item.quantity }}</span>
            </div>
            <div class="item-price">
              <span>${{ item.price.toFixed(2) }} each</span>
              <strong>${{ (item.price * item.quantity).toFixed(2) }}</strong>
            </div>
          </div>
        </div>

        <div class="order-summary">
          <div class="summary-row">
            <span>Items:</span>
            <span>${{ order.itemsPrice.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>${{ order.shippingPrice.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Tax:</span>
            <span>${{ order.taxPrice.toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <strong>Total:</strong>
            <strong>${{ order.totalPrice.toFixed(2) }}</strong>
          </div>
        </div>
      </div>

      <div class="actions">
        <router-link to="/orders" class="btn btn-secondary">Back to Orders</router-link>
        <button v-if="!order.isPaid" @click="handlePayment" class="btn btn-primary">
          Pay with {{ order.paymentMethod }}
        </button>
      </div>
    </div>

    <div v-else class="error">Order not found</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/order'

const route = useRoute()
const orderStore = useOrderStore()

const order = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    order.value = await orderStore.fetchOrder(route.params.id)
  } catch (error) {
    console.error('Error fetching order:', error)
  } finally {
    loading.value = false
  }
})

const handlePayment = () => {
  alert('Payment integration with PayPal will be processed here')
}
</script>

<style scoped>
.order-detail h1 {
  margin-bottom: 30px;
}

.order-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  padding: 25px;
}

.card h2 {
  margin-bottom: 20px;
  font-size: 20px;
}

.info-row {
  display: flex;
  margin-bottom: 15px;
  gap: 10px;
}

.info-row .label {
  font-weight: 600;
  min-width: 130px;
}

.status-badge,
.paid-badge,
.unpaid-badge {
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.pending {
  background: #ffc107;
  color: white;
}

.status-badge.processing {
  background: #17a2b8;
  color: white;
}

.status-badge.shipped {
  background: #007bff;
  color: white;
}

.status-badge.delivered {
  background: #28a745;
  color: white;
}

.status-badge.cancelled {
  background: #dc3545;
  color: white;
}

.paid-badge {
  background: #d4edda;
  color: #155724;
}

.unpaid-badge {
  background: #f8d7da;
  color: #721c24;
}

.order-items {
  margin-bottom: 30px;
}

.items-list {
  margin-bottom: 30px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.quantity {
  color: #666;
  font-size: 14px;
}

.item-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.order-summary {
  padding-top: 20px;
  border-top: 2px solid #ddd;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-row.total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #ddd;
  font-size: 20px;
}

.actions {
  display: flex;
  gap: 15px;
}
</style>
