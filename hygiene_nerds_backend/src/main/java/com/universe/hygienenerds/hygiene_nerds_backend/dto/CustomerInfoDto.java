package com.universe.hygienenerds.hygiene_nerds_backend.dto;

import lombok.*;

@Data
@Getter
@Setter
public class CustomerInfoDto {
    private String firstName;

    private String lastName;

    private String username;

    private String address;

    private String city;

    private String zipCode;

    private String paymentMethod;
}
