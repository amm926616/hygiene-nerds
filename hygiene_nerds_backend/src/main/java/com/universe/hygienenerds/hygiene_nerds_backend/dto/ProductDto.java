package com.universe.hygienenerds.hygiene_nerds_backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDto {
    private int id;
    private String name;
    private String brandName;
    private String description;
    private double price;
    private String imageUrl;
    private String category;
    private int stock;
}
