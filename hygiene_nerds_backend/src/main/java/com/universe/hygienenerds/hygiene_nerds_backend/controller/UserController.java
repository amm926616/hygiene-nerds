package com.universe.hygienenerds.hygiene_nerds_backend.controller;

import com.universe.hygienenerds.hygiene_nerds_backend.dto.OrderHistoryDto;
import com.universe.hygienenerds.hygiene_nerds_backend.dto.UserTypes;
import com.universe.hygienenerds.hygiene_nerds_backend.service.CheckoutService;
import com.universe.hygienenerds.hygiene_nerds_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final CheckoutService checkoutService;

    //example: localhost:8080/api/auth/user/admin
    @GetMapping("/{username}")
    public ResponseEntity<?> getUserDetails(@PathVariable String username) {
        UserTypes.UserDto userDto = userService.getUserDetails(username);

        if (userDto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderHistoryDto>> getUserOrders(
            @RequestParam String username) {
        List<OrderHistoryDto> orders = checkoutService.getUserOrders(username.toLowerCase());
        return ResponseEntity.ok(orders);
    }
}
