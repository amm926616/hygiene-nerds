package com.universe.hygienenerds.hygiene_nerds_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutRequest {
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String zipCode;
    private String paymentMethod;
    private List<CartItemDto> cartItems;
    private Double total;
}