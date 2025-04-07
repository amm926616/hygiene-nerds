package com.universe.hygienenerds.hygiene_nerds_backend.controller;

import com.universe.hygienenerds.hygiene_nerds_backend.dto.CheckoutDto;
import com.universe.hygienenerds.hygiene_nerds_backend.dto.OrderConfirmationDto;
import com.universe.hygienenerds.hygiene_nerds_backend.dto.OrderResponse;
import com.universe.hygienenerds.hygiene_nerds_backend.service.CheckoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
public class CheckoutController {

    private final CheckoutService checkoutService;

    @GetMapping
    public String hello() {
        return "works!";
    }

    @PostMapping("/process")
    public ResponseEntity<?> processCheckout(
            @RequestBody CheckoutDto checkoutDto) { // Inject authenticated user

        OrderResponse response = checkoutService.processCheckout(checkoutDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/confirm/{orderId}")
    public ResponseEntity<OrderConfirmationDto> getOrderConfirmation(
            @PathVariable String orderId) {
        OrderConfirmationDto confirmation = checkoutService.getOrderConfirmation(orderId);
        return ResponseEntity.ok(confirmation);
    }
}