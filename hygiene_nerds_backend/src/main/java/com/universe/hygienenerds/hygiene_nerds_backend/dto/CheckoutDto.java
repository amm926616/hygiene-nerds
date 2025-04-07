package com.universe.hygienenerds.hygiene_nerds_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutDto {
    private CustomerInfoDto formData;
    private List<CartItemDto> cartItems;
    private double total;
}