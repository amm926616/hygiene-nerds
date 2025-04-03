package com.universe.hygienenerds.hygiene_nerds_backend.service;

import com.universe.hygienenerds.hygiene_nerds_backend.dao.FeaturedProductDao;
import com.universe.hygienenerds.hygiene_nerds_backend.dao.ProductDao;
import com.universe.hygienenerds.hygiene_nerds_backend.dto.ProductDto;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductDao productDao;
    private final FeaturedProductDao featuredProductDao;

    public List<ProductDto> getProducts() {
        List<Product> products = productDao.findAll();
        List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products) {
            productDtos.add(convertToDto(product));
        }
        System.out.println(productDtos);
        return productDtos;
    }

    public Product getProductById(Integer id) {
        return productDao.findById(id).orElse(null);
    }

    public void addProducts(List<Product> products) {
        productDao.saveAll(products);
    }

    public void saveProduct(Product product) {
        productDao.save(product);
    }

    public void deleteProduct(Integer id) {
        productDao.deleteById(id);
    }

    public ProductDto convertToDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        assignDto(product, productDto);
        return productDto;
    }

    private static void assignProduct(ProductDto productDto, Product product) {
        product.setStock(productDto.getStock());
        product.setCategory(productDto.getCategory());
        product.setImageUrl(productDto.getImageUrl());
        product.setPrice(productDto.getPrice());
        product.setBrandName(productDto.getBrandName());
        product.setDescription(productDto.getDescription());
        product.setName(productDto.getName());
    }

    private static void assignDto(Product product, ProductDto productDto) {
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setBrandName(product.getBrandName());
        productDto.setPrice(product.getPrice());
        productDto.setImageUrl(product.getImageUrl());
        productDto.setCategory(product.getCategory());
        productDto.setStock(product.getStock());
    }

    public String updateProduct(Integer productid, ProductDto updateProduct) {
        Product product = productDao.findById(productid).orElse(null);
        if (product != null) {
            setProductData(updateProduct, product);
            productDao.save(product);
            return "Product Updated Successfully";
        } else {
            return "failed to update product.";
        }
    }

    public static void setProductData(ProductDto updateProductDto, Product originalProduct) {
        assignProduct(updateProductDto, originalProduct);
    }


    public List<Product> getAllFeaturedProducts() {
        return featuredProductDao.findAll().stream()
                .flatMap(fp -> fp.getProducts().stream())
                .collect(Collectors.toList());
    }

    public List<ProductDto> getProductsByIds(List<Integer> ids) {
        List<Product> products = productDao.findAllById(ids);
        List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products) {
            productDtos.add(convertToDto(product));
        }
        return productDtos;
    }
}
