package com.ecommerce.service;

import com.ecommerce.model.Order;
import com.ecommerce.model.User;
import com.ecommerce.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service class for Order management
 * Handles order CRUD operations and business logic
 */
@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;

    /**
     * Create a new order
     * @param order the order to create
     * @return the created order
     */
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    /**
     * Find order by ID
     * @param id the order ID
     * @return the order
     */
    @Transactional(readOnly = true)
    public Order findById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    /**
     * Get all orders
     * @return list of all orders
     */
    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /**
     * Get orders by user
     * @param user the user
     * @return list of user's orders
     */
    @Transactional(readOnly = true)
    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }

    /**
     * Get orders by user ID
     * @param userId the user ID
     * @return list of user's orders
     */
    @Transactional(readOnly = true)
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    /**
     * Update order status
     * @param id the order ID
     * @param status the new status
     * @return the updated order
     */
    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = findById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    /**
     * Cancel order
     * @param id the order ID
     * @return the cancelled order
     */
    public Order cancelOrder(Long id) {
        return updateOrderStatus(id, Order.OrderStatus.CANCELLED);
    }
}
