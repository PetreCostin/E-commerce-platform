package com.ecommerce.platform.controller;

import com.ecommerce.platform.dto.ApiResponse;
import com.ecommerce.platform.dto.CartItemDTO;
import com.ecommerce.platform.model.User;
import com.ecommerce.platform.repository.UserRepository;
import com.ecommerce.platform.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("isAuthenticated()")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getCartItems(Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        List<CartItemDTO> cartItems = cartService.getCartItems(userId);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping
    public ResponseEntity<CartItemDTO> addToCart(
            @Valid @RequestBody CartItemDTO cartItemDTO,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        CartItemDTO addedItem = cartService.addToCart(userId, cartItemDTO.getProductId(), cartItemDTO.getQuantity());
        return ResponseEntity.status(HttpStatus.CREATED).body(addedItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItemDTO> updateCartItem(
            @PathVariable Long id,
            @Valid @RequestBody CartItemDTO cartItemDTO,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        CartItemDTO updatedItem = cartService.updateCartItem(userId, id, cartItemDTO.getQuantity());
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> removeFromCart(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        cartService.removeFromCart(userId, id);
        return ResponseEntity.ok(new ApiResponse(true, "Item removed from cart"));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse> clearCart(Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        cartService.clearCart(userId);
        return ResponseEntity.ok(new ApiResponse(true, "Cart cleared successfully"));
    }

    private Long getUserIdFromAuthentication(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }
}
