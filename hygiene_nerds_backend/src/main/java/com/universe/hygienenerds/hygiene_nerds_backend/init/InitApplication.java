package com.universe.hygienenerds.hygiene_nerds_backend.init;

import com.universe.hygienenerds.hygiene_nerds_backend.dao.ProductDao;
import com.universe.hygienenerds.hygiene_nerds_backend.dao.RoleDao;
import com.universe.hygienenerds.hygiene_nerds_backend.dao.SpecialPackageDao;
import com.universe.hygienenerds.hygiene_nerds_backend.dao.UserDao;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class InitApplication {

    private final RoleDao roleDao;
    private final UserDao userDao;
    private final ProductDao productDao;
    private final SpecialPackageDao specialPackageDao;
    private final PasswordEncoder passwordEncoder;

    @Bean
    @Transactional
    ApplicationRunner runner() {
        return r -> {
            if (userDao.count() == 0) {
                createRolesAndUsers();
                Product toothbrush = new Product(
                    "Toothbrush",
                    "Soft bristle toothbrush",
                    "Oral-B",
                    4.00,
                    "toothbrush.jpg",
                    "oral-care",
                    150
                );
                productDao.save(toothbrush);

                Product mouthwash = new Product(
                    "Mouthwash",
                    "Antiseptic mouthwash for fresh breath",
                    "Listerine",
                    7.00,
                    "mouthwash.jpg",
                    "oral-care",
                    100
                );
                productDao.save(mouthwash);

                Product dentalFloss = new Product(
                    "Dental Floss",
                    "Waxed dental floss",
                    "Glide",
                    3.00,
                    "floss.jpg",
                    "oral-care",
                    300
                );
                productDao.save(dentalFloss);

                ArrayList<Product> products = new ArrayList<>();
                products.add(toothbrush);
                products.add(mouthwash);
                products.add(dentalFloss);
                createSpecialPackage("Dental Care Package", 20, products);
            }
        };
    }

    private void createMorePackages(Product mouthwash, Product dentalFloss) {
        // oral care package
        Product electricToothbrush = new Product(
            "Electric Toothbrush",
            "Rechargeable electric toothbrush",
            "Philips Sonicare",
            89.99,
            "electric-toothbrush.jpg",
            "oral-care",
            75
        );
        productDao.save(electricToothbrush);

        Product whiteningToothpaste = new Product(
            "Whitening Toothpaste",
            "Enamel-safe whitening toothpaste",
            "Colgate Optic White",
            8.50,
            "whitening-paste.jpg",
            "oral-care",
            200
        );
        productDao.save(whiteningToothpaste);

        ArrayList<Product> premiumOralProducts = new ArrayList<>();
        premiumOralProducts.add(electricToothbrush);
        premiumOralProducts.add(whiteningToothpaste);
        premiumOralProducts.add(mouthwash); // From your existing product
        premiumOralProducts.add(dentalFloss); // From your existing product

        createSpecialPackage(
            "Premium Oral Care Package",
            11,
            premiumOralProducts
        );
    }

    @Profile("dev")
    private void createRolesAndUsers() {
        Role[] roles = createRoles(); // this creates roles
        createUsers(roles[0], roles[1]); // this creates users
    }

    public Role[] createRoles() {
        // 0 for admin, 1 for customer
        Role adminRole = new Role();
        adminRole.setRoleName("ROLE_ADMIN");
        roleDao.save(adminRole);

        Role customerRole = new Role();
        customerRole.setRoleName("ROLE_CUSTOMER");
        roleDao.save(customerRole);

        return new Role[] { adminRole, customerRole };
    }

    public void createUsers(Role adminRole, Role customerRole) {
        // Create admin user
        Admin admin = new Admin();
        admin.setFirstName("admin");
        admin.setLastName("admin");
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin")); // Encrypt password
        admin.setEmail("admin@gmail.com");
        admin.setPhoneNumber("+1234567890");
        admin.setRole(adminRole);
        admin.setDepartment("selling_department");
        userDao.save(admin);

        // Create customer user
        Customer customer = new Customer();
        customer.setFirstName("customer");
        customer.setLastName("customer");
        customer.setPhoneNumber("+1234567890");
        customer.setUsername("customer");
        customer.setPassword(passwordEncoder.encode("customer")); // Encrypt password
        customer.setEmail("customer@gmail.com");
        customer.setRole(customerRole);
        customer.setAddress("Apartment of hygiene lovers");
        userDao.save(customer);
    }

    public List<Product> createProducts() {
        Product soap = new Product(
            "Soap",
            "Soap made from natural ingredients",
            "dove",
            10.0,
            "soap.jpg",
            "soap",
            100
        );
        productDao.save(soap);

        Product product1 = new Product(
            "Shampoo",
            "Shampoo made from natural ingredients",
            "dove",
            10.0,
            "shampoo.jpg",
            "shampoo",
            100
        );
        productDao.save(product1);

        Product product2 = new Product(
            "Conditioner",
            "Conditioner made from natural ingredients",
            "dove",
            10.0,
            "conditioner.jpg",
            "conditioner",
            100
        );
        productDao.save(product2);

        return List.of(soap, product1, product2);
    }

    public void createSpecialPackage(
        String serviceName,
        Integer duration,
        List<Product> products
    ) {
        LocalDateTime expirationDate = LocalDateTime.of(
            2025,
            12,
            31,
            23,
            59,
            59
        ); // Expires on Dec 31, 2025, at 23:59:59

        // Creating a SpecialService object
        SpecialPackages specialPackages = new SpecialPackages(
            serviceName,
            duration,
            expirationDate
        );

        for (Product product : products) {
            specialPackages.addProduct(product);
        }

        specialPackageDao.save(specialPackages);
    }
}
// for special products
/* Product toothpaste = new Product("Toothpaste", "Fluoride toothpaste for daily use", "Colgate", 5.50, "toothpaste.jpg", "oral-care", 200);
productDao.save(toothpaste);

Product toothbrush = new Product("Toothbrush", "Soft bristle toothbrush", "Oral-B", 4.00, "toothbrush.jpg", "oral-care", 150);
productDao.save(toothbrush);

Product mouthwash = new Product("Mouthwash", "Antiseptic mouthwash for fresh breath", "Listerine", 7.00, "mouthwash.jpg", "oral-care", 100);
productDao.save(mouthwash);

Product dentalFloss = new Product("Dental Floss", "Waxed dental floss", "Glide", 3.00, "floss.jpg", "oral-care", 300);
productDao.save(dentalFloss);

// Body and Skin Care Products
Product bodyWash = new Product("Body Wash", "Moisturizing body wash", "Olay", 8.00, "bodywash.jpg", "body-care", 120);
productDao.save(bodyWash);

Product lotion = new Product("Body Lotion", "Hydrating body lotion", "Nivea", 9.00, "lotion.jpg", "body-care", 110);
productDao.save(lotion);

Product deodorant = new Product("Deodorant", "Antiperspirant deodorant", "Secret", 6.50, "deodorant.jpg", "body-care", 90);
productDao.save(deodorant);

Product sunscreen = new Product("Sunscreen", "Broad spectrum sunscreen SPF 50", "Neutrogena", 12.00, "sunscreen.jpg", "skin-care", 80);
productDao.save(sunscreen);

Product faceWash = new Product("Face Wash", "Gentle facial cleanser", "Cetaphil", 7.50, "facewash.jpg", "skin-care", 95);
productDao.save(faceWash);

Product faceToner = new Product("Face Toner", "Balancing face toner", "Thayers", 9.50, "facetoner.jpg", "skin-care", 85);
productDao.save(faceToner);

// Hair Care Products
Product hairGel = new Product("Hair Gel", "Strong hold hair gel", "Gatsby", 6.00, "hairgel.jpg", "hair-care", 100);
productDao.save(hairGel);

Product hairSpray = new Product("Hair Spray", "Extra hold hair spray", "L'Oreal", 8.50, "hairspray.jpg", "hair-care", 90);
productDao.save(hairSpray);

Product dryShampoo = new Product("Dry Shampoo", "Dry shampoo for quick refresh", "Batiste", 7.00, "dryshampoo.jpg", "hair-care", 110);
productDao.save(dryShampoo);

// Feminine Hygiene Products
Product sanitaryPads = new Product("Sanitary Pads", "Ultra thin sanitary pads", "Always", 6.00, "sanitarypads.jpg", "feminine-care", 150);
productDao.save(sanitaryPads);

Product tampons = new Product("Tampons", "Regular absorbency tampons", "Tampax", 5.50, "tampons.jpg", "feminine-care", 140);
productDao.save(tampons);

Product feminineWash = new Product("Feminine Wash", "Gentle feminine wash", "Summer's Eve", 8.00, "feminineWash.jpg", "feminine-care", 100);
productDao.save(feminineWash);

//Hand Hygiene
Product handSanitizer = new Product("Hand Sanitizer", "Alcohol-based hand sanitizer", "Purell", 4.00, "handsanitizer.jpg", "hand-care", 200);
productDao.save(handSanitizer);

Product handCream = new Product("Hand Cream", "Moisturizing hand cream", "Neutrogena", 6.00, "handcream.jpg", "hand-care", 150);
productDao.save(handCream);

// Baby Hygiene
Product babyWipes = new Product("Baby Wipes", "Gentle baby wipes", "Pampers", 5.00, "babywipes.jpg", "baby-care", 200);
productDao.save(babyWipes);

Product babyShampoo = new Product("Baby Shampoo", "Tear-free baby shampoo", "Johnson's", 6.00, "babyshampoo.jpg", "baby-care", 150);
productDao.save(babyShampoo);
 */
