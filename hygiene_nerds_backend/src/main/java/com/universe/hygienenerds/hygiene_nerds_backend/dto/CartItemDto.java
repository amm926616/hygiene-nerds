package com.universe.hygienenerds.hygiene_nerds_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {
    private Long productId;
    private String name;
    private String brandName;
    private String imageUrl;
    private Integer quantity;
    private Double price;
}