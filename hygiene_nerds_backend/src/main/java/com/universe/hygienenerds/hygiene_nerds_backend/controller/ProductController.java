package com.universe.hygienenerds.hygiene_nerds_backend.controller;

import com.universe.hygienenerds.hygiene_nerds_backend.dao.ProductDao;
import com.universe.hygienenerds.hygiene_nerds_backend.dto.ProductDto;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.Product;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.SpecialPackages;
import com.universe.hygienenerds.hygiene_nerds_backend.service.ImageHandlingService;
import com.universe.hygienenerds.hygiene_nerds_backend.service.ProductService;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.universe.hygienenerds.hygiene_nerds_backend.service.SpecialPackagesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;
    private final ImageHandlingService imageHandlingService;
    private final ProductDao productDao;
    private final SpecialPackagesService specialPackagesService;

    @GetMapping
    public List<ProductDto> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    @GetMapping("/bulk")
    public List<ProductDto> getProductsByIds(@RequestParam List<Integer> ids) {
        System.out.println("From backend: " + ids);
        System.out.println(ids.getClass());
        return productService.getProductsByIds(ids);
    }

    @PostMapping("/add-products")
    public String addProducts(@RequestBody ProductDto[] productDtos) {
        System.out.println(Arrays.toString(productDtos));
        // Map ProductDto[] to Product[] or List<Product>
        List<Product> products = Arrays.stream(productDtos)
            .map(this::convertToProduct)
            .toList();

        System.out.println(products);

        // Save products
        productService.addProducts(products);
        return "Products added successfully";
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProduct(
        @RequestBody ProductDto productDto
    ) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setBrandName(productDto.getBrandName());
        product.setPrice(productDto.getPrice());
        product.setImageUrl(productDto.getImageUrl());
        product.setCategory(productDto.getCategory());
        productService.saveProduct(product);
        return ResponseEntity.ok("Product added successfully");
    }

    @PostMapping("/add-new-product")
    public ResponseEntity<Map<String, String>> addProduct(
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam("brandName") String brandName,
        @RequestParam("price") double price,
        @RequestParam(value = "stock", defaultValue = "10") Integer stock, // Added default value
        @RequestParam("category") String category,
        @RequestParam("imageFile") MultipartFile imageFile
    ) throws IOException {
        String imagePath = imageHandlingService.saveImage(1, name, imageFile);
        Product product = new Product(
            name,
            description,
            brandName,
            price,
            imagePath,
            category,
            stock
        );
        productService.saveProduct(product);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Product added successfully");
        response.put("imagePath", imagePath);
        response.put("productId", String.valueOf(product.getId())); // If your Product has an ID

        return ResponseEntity.ok(response);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Map<String, String>> updateProduct(
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam("brandName") String brandName,
        @RequestParam("price") double price,
        @RequestParam("stock") Integer stock,
        @RequestParam("category") String category,
        @RequestParam("imageFile") MultipartFile imageFile,
        @PathVariable Integer id
    ) throws IOException {
        Product product = productDao.findProductById(id).orElse(null);
        System.out.println("The product: ");
        System.out.println(product);
        if (product != null) {
            imageHandlingService.deleteImage(product.getImageUrl()); //java. nio. file. NoSuchFileException
            product.setName(name);
            product.setDescription(description);
            product.setBrandName(brandName);
            product.setPrice(price);
            product.setStock(stock);
            product.setCategory(category);

            String imagePath = imageHandlingService.saveImage(1, name, imageFile);
            product.setImageUrl(imagePath);
            productService.saveProduct(product);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Product added successfully");
            response.put("imagePath", imagePath);
            response.put("productId", String.valueOf(product.getId())); // If your Product has an ID

            System.out.println("Product updated successfully!");

            return ResponseEntity.ok(response);
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "Product cannot be found by name");

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable String id) {
        Integer productId = Integer.parseInt(id);
        Product product = productService.getProductById(productId);
        imageHandlingService.deleteImage(product.getImageUrl());
        productService.deleteProduct(productId);
        return "Product deleted successfully";
    }

    // Utility method to map ProductDto to Product
    private Product convertToProduct(ProductDto productDto) {
        Product product = new Product();
        ProductService.setProductData(productDto, product);
        return product;
    }

    @GetMapping("/featured")
    public List<Product> getAllProducts() {
        return productService.getAllFeaturedProducts();
    }

    @GetMapping("/special-packages")
    public ResponseEntity<List<SpecialPackages>> getAllSpecialPackages() {
        return ResponseEntity.ok(specialPackagesService.getAllSpecialPackagesWithProducts());
    }
}
