package com.universe.hygienenerds.hygiene_nerds_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "checkout_details")
@Getter
@Setter
@NoArgsConstructor
public class CheckoutDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "checkoutDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CheckoutItem> items = new ArrayList<>();
    private String firstName;
    private String lastName;
    private String username;
    private String address;
    private String city;
    private String zipCode;
    private String paymentMethod;
    private Double totalAmount;

    @CreationTimestamp
    @Column(name = "checkout_date", updatable = false)
    private LocalDateTime checkoutDate;

    public CheckoutDetail(Customer customer,
                          String firstName,
                          String lastName,
                          String username,
                          String address,
                          String city,
                          String zipCode,
                          String paymentMethod,
                          double total) {
        this.customer = customer;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.address = address;
        this.city = city;
        this.zipCode = zipCode;
        this.paymentMethod = paymentMethod;
        this.totalAmount = total;
        this.checkoutDate = LocalDateTime.now();
    }

    // Helper method to add items
    public void addItem(CheckoutItem item) {
        items.add(item);
        item.setCheckoutDetail(this);
    }

    public String toString() {
        return "CheckoutDetail{" +
                "id=" + id +
                ", customer=" + customer +
                ", items=" + items +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", totalAmount=" + totalAmount +
                ", checkoutDate=" + checkoutDate +
                '}';
    }
}