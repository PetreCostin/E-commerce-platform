package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service class for Product management
 * Handles product CRUD operations and business logic
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    /**
     * Create a new product
     * @param product the product to create
     * @return the created product
     */
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    /**
     * Find product by ID
     * @param id the product ID
     * @return the product
     */
    @Transactional(readOnly = true)
    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    /**
     * Get all active products
     * @return list of active products
     */
    @Transactional(readOnly = true)
    public List<Product> getAllActiveProducts() {
        return productRepository.findByActiveTrue();
    }

    /**
     * Get all products
     * @return list of all products
     */
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Get products by category
     * @param category the category
     * @return list of products in the category
     */
    @Transactional(readOnly = true)
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryAndActiveTrue(category);
    }

    /**
     * Search products by name
     * @param name the name pattern
     * @return list of matching products
     */
    @Transactional(readOnly = true)
    public List<Product> searchProducts(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    /**
     * Update product
     * @param id the product ID
     * @param updatedProduct the updated product data
     * @return the updated product
     */
    public Product updateProduct(Long id, Product updatedProduct) {
        Product product = findById(id);
        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setCategory(updatedProduct.getCategory());
        product.setStockQuantity(updatedProduct.getStockQuantity());
        product.setImageUrl(updatedProduct.getImageUrl());
        product.setActive(updatedProduct.isActive());
        return productRepository.save(product);
    }

    /**
     * Delete product
     * @param id the product ID
     */
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    /**
     * Update product stock
     * @param id the product ID
     * @param quantity the quantity to add (negative to subtract)
     */
    public void updateStock(Long id, Integer quantity) {
        Product product = findById(id);
        int newQuantity = product.getStockQuantity() + quantity;
        if (newQuantity < 0) {
            throw new RuntimeException("Insufficient stock");
        }
        product.setStockQuantity(newQuantity);
        productRepository.save(product);
    }
}
