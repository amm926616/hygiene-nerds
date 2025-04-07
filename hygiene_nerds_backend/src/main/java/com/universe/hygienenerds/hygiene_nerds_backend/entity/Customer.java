package com.universe.hygienenerds.hygiene_nerds_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "customers")
public class Customer extends User{
    @Column(columnDefinition = "TEXT")
    private String address;
}
