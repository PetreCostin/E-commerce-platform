<template>
  <div class="orders">
    <h1>My Orders</h1>

    <div v-if="loading" class="loading">Loading orders...</div>

    <div v-else-if="orders.length === 0" class="no-orders">
      <p>You haven't placed any orders yet.</p>
      <router-link to="/products" class="btn btn-primary">Start Shopping</router-link>
    </div>

    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order._id" class="order-card card">
        <div class="order-header">
          <div class="order-id">
            <strong>Order #{{ order._id.slice(-8) }}</strong>
          </div>
          <div class="order-date">
            {{ new Date(order.createdAt).toLocaleDateString() }}
          </div>
        </div>

        <div class="order-items">
          <div v-for="item in order.orderItems" :key="item._id" class="order-item">
            <span>{{ item.name }} x {{ item.quantity }}</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>

        <div class="order-footer">
          <div class="order-status">
            <span class="status-badge" :class="order.status">{{ order.status }}</span>
            <span v-if="order.isPaid" class="paid-badge">Paid</span>
            <span v-else class="unpaid-badge">Unpaid</span>
          </div>
          
          <div class="order-total">
            <strong>Total: ${{ order.totalPrice.toFixed(2) }}</strong>
          </div>

          <router-link :to="`/orders/${order._id}`" class="btn btn-primary">View Details</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()
const orders = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    orders.value = await orderStore.fetchMyOrders()
  } catch (error) {
    console.error('Error fetching orders:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.orders h1 {
  margin-bottom: 30px;
}

.no-orders {
  text-align: center;
  padding: 60px 20px;
}

.no-orders p {
  font-size: 20px;
  margin-bottom: 20px;
  color: #666;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  padding: 25px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.order-id {
  font-size: 18px;
}

.order-date {
  color: #666;
}

.order-items {
  margin-bottom: 20px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.order-status {
  display: flex;
  gap: 10px;
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

.order-total {
  font-size: 20px;
}
</style>
