package com.ecommerce.repository;

import com.ecommerce.model.Order;
import com.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Order entity
 * Provides CRUD operations and custom queries for Order management
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    /**
     * Find all orders for a specific user
     * @param user the user to find orders for
     * @return List of orders
     */
    List<Order> findByUser(User user);

    /**
     * Find orders by user ID
     * @param userId the user ID to find orders for
     * @return List of orders
     */
    List<Order> findByUserId(Long userId);

    /**
     * Find orders by status
     * @param status the order status to filter by
     * @return List of orders with the specified status
     */
    List<Order> findByStatus(Order.OrderStatus status);
}
