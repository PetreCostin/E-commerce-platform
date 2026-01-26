<template>
  <div class="products">
    <h1>Products</h1>
    
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        @input="handleSearch" 
        type="text" 
        placeholder="Search products..." 
        class="search-input"
      />
    </div>

    <div v-if="productStore.loading" class="loading">Loading products...</div>
    
    <div v-else>
      <div v-if="productStore.products.length === 0" class="no-products">
        No products found.
      </div>
      
      <div v-else class="product-grid">
        <ProductCard 
          v-for="product in productStore.products" 
          :key="product._id" 
          :product="product" 
        />
      </div>

      <div v-if="productStore.pagination.pages > 1" class="pagination">
        <button 
          @click="changePage(page)" 
          v-for="page in productStore.pagination.pages" 
          :key="page"
          :class="{ active: page === productStore.pagination.page }"
          class="btn btn-secondary"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()
const searchQuery = ref('')
let searchTimeout = null

onMounted(() => {
  productStore.fetchProducts()
})

const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    productStore.fetchProducts({ keyword: searchQuery.value, page: 1 })
  }, 500)
}

const changePage = (page) => {
  productStore.fetchProducts({ keyword: searchQuery.value, page })
}
</script>

<style scoped>
.products h1 {
  margin-bottom: 30px;
}

.search-bar {
  margin-bottom: 30px;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.no-products {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.pagination .btn {
  min-width: 40px;
}

.pagination .btn.active {
  background-color: #007bff;
  color: white;
}
</style>
