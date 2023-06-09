package com.backend.orderproduct.repository;

import com.backend.orderproduct.entity.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {

    Optional<List<OrderProduct>> findAllByMemberId(String memberId);
}
