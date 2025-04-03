package com.universe.hygienenerds.hygiene_nerds_backend.dao;

import com.universe.hygienenerds.hygiene_nerds_backend.entity.FeaturedProducts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeaturedProductDao extends JpaRepository<FeaturedProducts, Integer> {

}
