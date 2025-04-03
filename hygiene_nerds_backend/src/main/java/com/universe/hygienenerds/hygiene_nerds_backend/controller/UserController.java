package com.universe.hygienenerds.hygiene_nerds_backend.controller;

import com.universe.hygienenerds.hygiene_nerds_backend.dto.UserTypes;
import com.universe.hygienenerds.hygiene_nerds_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/user")
public class UserController {
    private final UserService userService;

    //example: localhost:8080/api/auth/user/admin
    @GetMapping("/{username}")
    public ResponseEntity<?> getUserDetails(@PathVariable String username) {
        UserTypes.UserDto userDto = userService.getUserDetails(username);

        if (userDto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userDto);
    }
}
