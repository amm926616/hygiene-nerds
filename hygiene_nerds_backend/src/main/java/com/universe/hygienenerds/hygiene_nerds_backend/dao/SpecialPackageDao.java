package com.universe.hygienenerds.hygiene_nerds_backend.dao;

import com.universe.hygienenerds.hygiene_nerds_backend.entity.SpecialPackages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SpecialPackageDao extends JpaRepository<SpecialPackages, Integer> {
    @Query("SELECT DISTINCT sp FROM SpecialPackages sp LEFT JOIN FETCH sp.offeredProducts")
    List<SpecialPackages> findAllWithProducts();    }

