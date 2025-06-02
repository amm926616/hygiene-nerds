package com.universe.hygienenerds.hygiene_nerds_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    private String name;
    private String brandName;

    @Column(columnDefinition = "TEXT")
    private String description;
    private double price;

    @Column(name = "image_url")
    private String imageUrl;
    private String category;
    private int stock = 0;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<SpecialPackages> packages = new ArrayList<>();

    public void packages(SpecialPackages service) {
        packages.add(service);
    }

    public Product(String name,
                   String description,
                   String brandName,
                   double price,
                   String imagePath,
                   String category,
                   Integer stock) {
        this.name = name;
        this.brandName = brandName;
        this.description = description;
        this.price = price;
        this.imageUrl = imagePath;
        this.category = category;
        this.stock = stock;
    }
}