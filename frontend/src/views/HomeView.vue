<template>
  <div class="home">
    <section class="hero">
      <h1>Welcome to E-Commerce Platform</h1>
      <p>Discover amazing products at great prices</p>
      <router-link to="/products" class="btn btn-primary">Shop Now</router-link>
    </section>

    <section class="featured">
      <h2>Featured Products</h2>
      <div v-if="loading" class="loading">Loading products...</div>
      <div v-else class="product-grid">
        <ProductCard 
          v-for="product in products" 
          :key="product._id" 
          :product="product" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()
const products = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await productStore.fetchProducts({ page: 1 })
    products.value = data.products.slice(0, 6)
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 24px;
  margin-bottom: 30px;
}

.featured {
  margin-bottom: 40px;
}

.featured h2 {
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
</style>
