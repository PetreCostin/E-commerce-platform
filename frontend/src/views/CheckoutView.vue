<template>
  <div class="checkout">
    <h1>Checkout</h1>

    <div v-if="success" class="alert alert-success">
      Order placed successfully! Redirecting to order details...
    </div>

    <div v-if="error" class="alert alert-error">{{ error }}</div>

    <div class="checkout-container">
      <div class="checkout-form">
        <div class="card">
          <h2>Shipping Address</h2>
          <form @submit.prevent="handleCheckout">
            <div class="form-group">
              <label for="street">Street Address</label>
              <input
                id="street"
                v-model="shippingAddress.street"
                type="text"
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="city">City</label>
                <input
                  id="city"
                  v-model="shippingAddress.city"
                  type="text"
                  required
                />
              </div>

              <div class="form-group">
                <label for="state">State</label>
                <input
                  id="state"
                  v-model="shippingAddress.state"
                  type="text"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="zipCode">ZIP Code</label>
                <input
                  id="zipCode"
                  v-model="shippingAddress.zipCode"
                  type="text"
                  required
                />
              </div>

              <div class="form-group">
                <label for="country">Country</label>
                <input
                  id="country"
                  v-model="shippingAddress.country"
                  type="text"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="paymentMethod">Payment Method</label>
              <select id="paymentMethod" v-model="paymentMethod" required>
                <option value="PayPal">PayPal</option>
                <option value="Card">Credit/Debit Card</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="loading || cartStore.items.length === 0">
              {{ loading ? 'Processing...' : 'Place Order' }}
            </button>
          </form>
        </div>
      </div>

      <div class="order-summary">
        <div class="card">
          <h2>Order Summary</h2>
          <div v-for="item in cartStore.items" :key="item._id" class="summary-item">
            <span>{{ item.name }} x {{ item.quantity }}</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>

          <div class="summary-totals">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>${{ itemsPrice.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping:</span>
              <span>${{ shippingPrice.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Tax:</span>
              <span>${{ taxPrice.toFixed(2) }}</span>
            </div>
            <div class="summary-row total">
              <strong>Total:</strong>
              <strong>${{ totalPrice.toFixed(2) }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const shippingAddress = ref({
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: ''
})

const paymentMethod = ref('PayPal')
const loading = ref(false)
const error = ref(null)
const success = ref(false)

const itemsPrice = computed(() => cartStore.totalPrice)
const shippingPrice = computed(() => itemsPrice.value > 50 ? 0 : 10)
const taxPrice = computed(() => itemsPrice.value * 0.1)
const totalPrice = computed(() => itemsPrice.value + shippingPrice.value + taxPrice.value)

const handleCheckout = async () => {
  loading.value = true
  error.value = null

  try {
    const orderData = {
      orderItems: cartStore.items.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: shippingAddress.value,
      paymentMethod: paymentMethod.value,
      itemsPrice: itemsPrice.value,
      taxPrice: taxPrice.value,
      shippingPrice: shippingPrice.value,
      totalPrice: totalPrice.value
    }

    const order = await orderStore.createOrder(orderData)
    success.value = true
    cartStore.clearCart()
    
    setTimeout(() => {
      router.push(`/orders/${order._id}`)
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to create order'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.checkout h1 {
  margin-bottom: 30px;
}

.checkout-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.checkout-form .card,
.order-summary .card {
  padding: 30px;
}

.card h2 {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.summary-totals {
  margin-top: 20px;
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

@media (max-width: 768px) {
  .checkout-container {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
