package com.ecommerce.repository;

import com.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Product entity
 * Provides CRUD operations and custom queries for Product management
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Find all active products
     * @return List of active products
     */
    List<Product> findByActiveTrue();

    /**
     * Find products by category
     * @param category the category to filter by
     * @return List of products in the category
     */
    List<Product> findByCategory(String category);

    /**
     * Find products by name containing (case-insensitive)
     * @param name the name pattern to search for
     * @return List of matching products
     */
    List<Product> findByNameContainingIgnoreCase(String name);

    /**
     * Find active products by category
     * @param category the category to filter by
     * @return List of active products in the category
     */
    List<Product> findByCategoryAndActiveTrue(String category);
}
