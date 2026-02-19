package com.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for E-Commerce Platform
 * 
 * This class serves as the entry point for the Spring Boot application.
 * It enables auto-configuration, component scanning, and configuration properties.
 * 
 * @author E-Commerce Team
 * @version 1.0.0
 */
@SpringBootApplication
public class EcommerceApplication {

    /**
     * Main method to run the Spring Boot application
     * 
     * @param args command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }
}
