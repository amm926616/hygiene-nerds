package com.universe.hygienenerds.hygiene_nerds_backend.service;

import com.universe.hygienenerds.hygiene_nerds_backend.dao.CheckoutDetailDao;
import com.universe.hygienenerds.hygiene_nerds_backend.dao.CustomerDao;
import com.universe.hygienenerds.hygiene_nerds_backend.dao.ProductDao;
import com.universe.hygienenerds.hygiene_nerds_backend.dto.CheckoutDto;
import com.universe.hygienenerds.hygiene_nerds_backend.dto.OrderConfirmationDto;
import com.universe.hygienenerds.hygiene_nerds_backend.dto.OrderHistoryDto;
import com.universe.hygienenerds.hygiene_nerds_backend.dto.OrderResponse;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.CheckoutDetail;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.CheckoutItem;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.Customer;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CheckoutService {

    private final CheckoutDetailDao checkoutDetailDao;
    private final ProductDao productDao;
    private final CustomerDao customerDao;

    public OrderResponse processCheckout(CheckoutDto checkoutDto) {
        System.out.println("This is the checkout request form sent from frontend.");
        System.out.println(checkoutDto);

        // 1. Create and populate checkout entity
        CheckoutDetail checkout = getCheckoutDetail(checkoutDto);

        // 2. Add cart items
        checkoutDto.getCartItems().forEach(item -> {
            Product product = productDao.findById(Math.toIntExact(item.getProductId()))
                    .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductId()));

            checkout.addItem(new CheckoutItem(
                    product,
                    item.getQuantity(),
                    item.getPrice()
            ));
        });

        System.out.println("final step before saving to database");
        System.out.println(checkout);

        // 3. Save and return response
        CheckoutDetail savedCheckout = checkoutDetailDao.save(checkout);
        System.out.println("Checkout ID after saving: " + savedCheckout.getId());

        return new OrderResponse(
                checkout.getId().toString(),
                "SUCCESS",
                "Order placed successfully"
        );
    }
    private CheckoutDetail getCheckoutDetail(CheckoutDto checkoutDto) {
        System.out.println("The username is " + checkoutDto.getFormData().getUsername());
        System.out.println("finding customer by username");
        Customer customer = customerDao.findByUsername(checkoutDto.getFormData().getUsername()).orElseThrow();
        System.out.println("After finding customer by username");
        System.out.println(customer);
        return new CheckoutDetail(
                customer,
                checkoutDto.getFormData().getFirstName(),
                checkoutDto.getFormData().getLastName(),
                checkoutDto.getFormData().getUsername(),
                checkoutDto.getFormData().getAddress(),
                checkoutDto.getFormData().getCity(),
                checkoutDto.getFormData().getZipCode(),
                checkoutDto.getFormData().getPaymentMethod(),
                checkoutDto.getTotal()
        );
    }
    public OrderConfirmationDto getOrderConfirmation(String orderId) {
        int id = Integer.parseInt(orderId);
        CheckoutDetail checkout = checkoutDetailDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderConfirmationDto dto = new OrderConfirmationDto();
        dto.setOrderId(checkout.getId().toString());
        dto.setStatus("SUCCESS");
        dto.setMessage("Order confirmed");
        dto.setOrderDate(checkout.getCheckoutDate());
        dto.setEstimatedDelivery(checkout.getCheckoutDate().plusDays(3));
        dto.setPaymentMethod(checkout.getPaymentMethod());

        dto.setItems(checkout.getItems().stream()
                .map(item -> {
                    OrderConfirmationDto.OrderItemDto itemDto = new OrderConfirmationDto.OrderItemDto();
                    itemDto.setName(item.getProduct().getName());
                    itemDto.setQuantity(item.getQuantity());
                    itemDto.setPrice(item.getPriceAtPurchase());
                    return itemDto;
                })
                .toList());

        dto.setTotal(checkout.getTotalAmount());

        OrderConfirmationDto.ShippingAddressDto address = new OrderConfirmationDto.ShippingAddressDto();
        address.setName(checkout.getFirstName() + " " + checkout.getLastName());
        address.setStreet(checkout.getAddress());
        address.setCity(checkout.getCity());
        address.setZipCode(checkout.getZipCode());
        dto.setShippingAddress(address);

        return dto;
    }
    public List<OrderHistoryDto> getUserOrders(String username) {
        return checkoutDetailDao.findByCustomerUsername(username)
                .stream()
                .map(this::mapToOrderHistoryDto)
                .collect(Collectors.toList());
    }
    private OrderHistoryDto mapToOrderHistoryDto(CheckoutDetail checkout) {
        OrderHistoryDto dto = new OrderHistoryDto();
        dto.setId(checkout.getId().toString());
        dto.setOrderDate(checkout.getCheckoutDate());
        dto.setStatus("PROCESSING"); // Set your actual status logic
        dto.setTotal(checkout.getTotalAmount());

        dto.setItems(checkout.getItems().stream()
                .map(item -> {
                    OrderHistoryDto.OrderItemDto itemDto = new OrderHistoryDto.OrderItemDto();
                    itemDto.setName(item.getProduct().getName());
                    itemDto.setQuantity(item.getQuantity());
                    itemDto.setPrice(item.getPriceAtPurchase());
                    itemDto.setImageUrl(item.getProduct().getImageUrl());
                    return itemDto;
                })
                .toList());

        return dto;
    }
}
