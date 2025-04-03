package com.universe.hygienenerds.hygiene_nerds_backend.dao;

import com.universe.hygienenerds.hygiene_nerds_backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductDao extends JpaRepository<Product, Integer> {
    Optional<Product> findProductById(Integer id);

    Optional<Product> findProductByName(String name);
}
