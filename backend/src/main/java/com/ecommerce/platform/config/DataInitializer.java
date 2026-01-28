package com.ecommerce.platform.config;

import com.ecommerce.platform.model.Category;
import com.ecommerce.platform.model.Product;
import com.ecommerce.platform.model.Role;
import com.ecommerce.platform.model.User;
import com.ecommerce.platform.repository.CategoryRepository;
import com.ecommerce.platform.repository.ProductRepository;
import com.ecommerce.platform.repository.RoleRepository;
import com.ecommerce.platform.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
        initializeAdminUser();
        initializeCategories();
        initializeSampleProducts();
    }

    private void initializeRoles() {
        if (roleRepository.count() == 0) {
            Role userRole = new Role(Role.RoleName.ROLE_USER);
            Role adminRole = new Role(Role.RoleName.ROLE_ADMIN);
            roleRepository.save(userRole);
            roleRepository.save(adminRole);
            logger.info("Roles initialized successfully");
        }
    }

    private void initializeAdminUser() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@ecommerce.com");
            admin.setPassword(passwordEncoder.encode("admin123"));

            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(Role.RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Admin Role not found")));
            roles.add(roleRepository.findByName(Role.RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("User Role not found")));

            admin.setRoles(roles);
            userRepository.save(admin);
            logger.info("Admin user created - Username: admin, Password: admin123");
        }
    }

    private void initializeCategories() {
        if (categoryRepository.count() == 0) {
            Category electronics = new Category("Electronics", "Electronic devices and gadgets");
            Category clothing = new Category("Clothing", "Men's and women's clothing");
            Category books = new Category("Books", "Books and literature");
            Category home = new Category("Home & Garden", "Home and garden products");

            categoryRepository.save(electronics);
            categoryRepository.save(clothing);
            categoryRepository.save(books);
            categoryRepository.save(home);
            logger.info("Categories initialized successfully");
        }
    }

    private void initializeSampleProducts() {
        if (productRepository.count() == 0) {
            Category electronics = categoryRepository.findByName("Electronics").orElse(null);
            Category clothing = categoryRepository.findByName("Clothing").orElse(null);
            Category books = categoryRepository.findByName("Books").orElse(null);

            if (electronics != null) {
                Product laptop = new Product("Laptop", "High-performance laptop", 
                        new BigDecimal("999.99"), 50, "https://via.placeholder.com/300");
                laptop.setCategory(electronics);

                Product smartphone = new Product("Smartphone", "Latest smartphone model", 
                        new BigDecimal("699.99"), 100, "https://via.placeholder.com/300");
                smartphone.setCategory(electronics);

                productRepository.save(laptop);
                productRepository.save(smartphone);
            }

            if (clothing != null) {
                Product tshirt = new Product("T-Shirt", "Cotton t-shirt", 
                        new BigDecimal("19.99"), 200, "https://via.placeholder.com/300");
                tshirt.setCategory(clothing);

                Product jeans = new Product("Jeans", "Blue denim jeans", 
                        new BigDecimal("49.99"), 150, "https://via.placeholder.com/300");
                jeans.setCategory(clothing);

                productRepository.save(tshirt);
                productRepository.save(jeans);
            }

            if (books != null) {
                Product book1 = new Product("Spring Boot in Action", "Learn Spring Boot development", 
                        new BigDecimal("39.99"), 75, "https://via.placeholder.com/300");
                book1.setCategory(books);

                Product book2 = new Product("Java Programming", "Complete Java programming guide", 
                        new BigDecimal("44.99"), 60, "https://via.placeholder.com/300");
                book2.setCategory(books);

                productRepository.save(book1);
                productRepository.save(book2);
            }

            logger.info("Sample products initialized successfully");
        }
    }
}
