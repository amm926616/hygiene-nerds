package com.universe.hygienenerds.hygiene_nerds_backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderHistoryDto {
    private String id;
    private LocalDateTime orderDate;
    private String status; // PROCESSING, SHIPPED, DELIVERED, CANCELLED
    private Double total;
    private List<OrderItemDto> items;

    @Data
    public static class OrderItemDto {
        private String name;
        private Integer quantity;
        private Double price;
        private String imageUrl;
    }
}