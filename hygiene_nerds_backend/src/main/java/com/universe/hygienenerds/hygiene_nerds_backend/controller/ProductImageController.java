package com.universe.hygienenerds.hygiene_nerds_backend.controller;

import com.universe.hygienenerds.hygiene_nerds_backend.service.ImageHandlingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/products/image")
@RequiredArgsConstructor
public class ProductImageController {
    private final ImageHandlingService imageHandlingService;
    private final Path imagePath = Paths.get("uploads/product_images");

    @GetMapping("/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        byte[] imageBytes = Files.readAllBytes(Path.of(imagePath + "/" + imageName));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Or MediaType.IMAGE_PNG if it's a PNG

        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }

    // localhost:8080/products/image/upload
    @PostMapping("/upload")
    public String uploadImage(
            @RequestParam("id") Integer id,
            @RequestParam("productName") String productName,
            @RequestParam("imageFile") MultipartFile imageFile
    ) throws Exception {
        // Debugging: Print received values
        System.out.println("Received ID: " + id);
        System.out.println("Received Product Name: " + productName);
        System.out.println("Received File: " + imageFile.getOriginalFilename());

        // Call the service to save the image (Assuming you handle image saving)
        return imageHandlingService.saveImage(id, productName, imageFile);
    }

    @DeleteMapping("/delete/{imageName}")
    public String deleteImage(@PathVariable String imageName) {
        return imageHandlingService.deleteImage(imageName);
    }
}
