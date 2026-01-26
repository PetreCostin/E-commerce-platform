<template>
  <div class="profile">
    <h1>My Profile</h1>

    <div v-if="success" class="alert alert-success">{{ success }}</div>
    <div v-if="error" class="alert alert-error">{{ error }}</div>

    <div class="card">
      <form @submit.prevent="handleUpdateProfile">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
          />
        </div>

        <div class="form-group">
          <label for="phone">Phone</label>
          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
          />
        </div>

        <h2>Address</h2>

        <div class="form-group">
          <label for="street">Street</label>
          <input
            id="street"
            v-model="formData.address.street"
            type="text"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="city">City</label>
            <input
              id="city"
              v-model="formData.address.city"
              type="text"
            />
          </div>

          <div class="form-group">
            <label for="state">State</label>
            <input
              id="state"
              v-model="formData.address.state"
              type="text"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="zipCode">ZIP Code</label>
            <input
              id="zipCode"
              v-model="formData.address.zipCode"
              type="text"
            />
          </div>

          <div class="form-group">
            <label for="country">Country</label>
            <input
              id="country"
              v-model="formData.address.country"
              type="text"
            />
          </div>
        </div>

        <h2>Change Password</h2>

        <div class="form-group">
          <label for="password">New Password (leave blank to keep current)</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            minlength="6"
          />
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Updating...' : 'Update Profile' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  }
})

const loading = ref(false)
const error = ref(null)
const success = ref(null)

onMounted(async () => {
  try {
    const profile = await authStore.getProfile()
    formData.value = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone || '',
      password: '',
      address: profile.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    }
  } catch (err) {
    error.value = 'Failed to load profile'
  }
})

const handleUpdateProfile = async () => {
  loading.value = true
  error.value = null
  success.value = null

  try {
    const updateData = {
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      address: formData.value.address
    }

    if (formData.value.password) {
      updateData.password = formData.value.password
    }

    await authStore.updateProfile(updateData)
    success.value = 'Profile updated successfully'
    formData.value.password = ''
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update profile'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.profile {
  max-width: 700px;
  margin: 0 auto;
}

.profile h1 {
  margin-bottom: 30px;
}

.profile h2 {
  margin: 30px 0 20px;
  font-size: 20px;
}

.card {
  padding: 40px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
