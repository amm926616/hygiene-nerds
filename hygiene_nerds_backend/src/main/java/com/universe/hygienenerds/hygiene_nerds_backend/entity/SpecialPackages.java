package com.universe.hygienenerds.hygiene_nerds_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "special_packages")
public class SpecialPackages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String packageName;

    @Column(name = "duration_in_days")
    private Integer duration; // Duration in hours, days, etc.

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") // Format for expiration date
    private LocalDateTime expirationDate; // Expiration timestamp

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "special_packages_offered_products", // Correct table name
            joinColumns = @JoinColumn(name = "special_packages_id"), // Matches the column in DB
            inverseJoinColumns = @JoinColumn(name = "offered_products_id") // Matches the column in DB
    )
    Set<Product> offeredProducts = new HashSet<>();

    public void addProduct(Product product) {
        offeredProducts.add(product);
    }
    public SpecialPackages(String packageName, Integer duration, LocalDateTime expirationDate) {
        this.packageName = packageName;
        this.duration = duration;
        this.expirationDate = expirationDate;
    }
}
