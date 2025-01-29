package com.hera.Solutions;


import com.hera.Solutions.DTO.OrderDTO;
import com.hera.Solutions.Entity.Order;
import com.hera.Solutions.Entity.Rute;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepo orderRepo;
    private final RuteService ruteService;

    public Order createOrder(OrderDTO orderDTO){
        Order order = new Order(orderDTO);
        return orderRepo.save(order);
    }
    public List<Order> getOrdersForRute(Long ruteId) {
        // Fetch the route to ensure it exists
        //Rute rute = ruteService.getRuteById(ruteId);
        // Return the list of orders connected to that route
        return orderRepo.findByRuteId(ruteId);
    }
}
