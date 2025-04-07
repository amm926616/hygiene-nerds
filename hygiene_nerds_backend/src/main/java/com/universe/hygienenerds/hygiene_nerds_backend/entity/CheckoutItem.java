package com.universe.hygienenerds.hygiene_nerds_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "checkout_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checkout_id", nullable = false)
    private CheckoutDetail checkoutDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double priceAtPurchase;
    public CheckoutItem(Product product, Integer quantity, Double price) {
        this.product = product;
        this.quantity = quantity;
        this.priceAtPurchase = price;
    }
}