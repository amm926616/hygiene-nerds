package com.universe.hygienenerds.hygiene_nerds_backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderConfirmationDto {
    private String orderId;
    private String status;
    private String message;
    private LocalDateTime orderDate;
    private LocalDateTime estimatedDelivery;
    private List<OrderItemDto> items;
    private Double total;
    private ShippingAddressDto shippingAddress;
    private String paymentMethod;

    @Data
    public static class OrderItemDto {
        private String name;
        private Integer quantity;
        private Double price;
    }

    @Data
    public static class ShippingAddressDto {
        private String name;
        private String street;
        private String city;
        private String zipCode;
    }
}