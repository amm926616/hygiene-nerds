package com.universe.hygienenerds.hygiene_nerds_backend.dao;

import com.universe.hygienenerds.hygiene_nerds_backend.entity.CheckoutDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CheckoutDetailDao extends JpaRepository<CheckoutDetail, Integer> {
    Optional<CheckoutDetail> findById(Integer id);

    List<CheckoutDetail> findByCustomerUsername(String username);
}
