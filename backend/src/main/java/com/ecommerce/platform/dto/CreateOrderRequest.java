package com.ecommerce.platform.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateOrderRequest {

    @NotBlank
    private String shippingAddress;

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
}
