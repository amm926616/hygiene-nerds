package com.universe.hygienenerds.hygiene_nerds_backend.service;

import com.universe.hygienenerds.hygiene_nerds_backend.dao.SpecialPackageDao;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.SpecialPackages;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecialPackagesService {
    private final SpecialPackageDao specialPackageRepository;

    public List<SpecialPackages> getAllSpecialPackagesWithProducts() {
        return specialPackageRepository.findAllWithProducts();
    }
}