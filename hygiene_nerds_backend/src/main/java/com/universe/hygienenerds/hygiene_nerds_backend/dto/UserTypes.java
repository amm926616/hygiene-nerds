package com.universe.hygienenerds.hygiene_nerds_backend.dto;

public class UserTypes {
    public interface UserDto {}  // Marker interface

    public record BasicUserDto(
            String firstName,
            String lastName,
            String username,
            String password,
            String email,
            String imageUrl,
            String phoneNumber
    ) implements UserDto {}

    public record AdminDto(
            String firstName,
            String lastName,
            String username,
            String password,
            String email,
            String phoneNumber,
            String department,
            String imageUrl
    ) implements UserDto {}

    public record CustomerDto(
            String firstName,
            String lastName,
            String username,
            String password,
            String email,
            String phoneNumber,
            String address,
            String imageUrl
    ) implements UserDto {}

    public record LoginDto(String username, String password) {}
}