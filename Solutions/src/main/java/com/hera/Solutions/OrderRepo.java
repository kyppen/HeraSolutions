package com.hera.Solutions;

import com.hera.Solutions.Entity.Order;
import com.hera.Solutions.Entity.Rute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByRuteId(Long ruteId);
}
