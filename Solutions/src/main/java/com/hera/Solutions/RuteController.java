package com.hera.Solutions;


import com.hera.Solutions.DTO.OrderDTO;
import com.hera.Solutions.DTO.RuteDTO;
import com.hera.Solutions.Entity.Order;
import com.hera.Solutions.Entity.Rute;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class RuteController {
    private final RuteService ruteService;
    private final OrderService orderService;
    @PostMapping("/rute/{ruteName}")
    public ResponseEntity<Rute> createRute(@PathVariable String ruteName) {
        log.info("WTF");
        Rute createdRute = ruteService.createRute(ruteName);
        return new ResponseEntity<>(createdRute, HttpStatus.CREATED);
    }

    @GetMapping("/rutes")
    public ResponseEntity<List<Rute>> allRutes(){
        return new ResponseEntity<>(ruteService.allRute(), HttpStatus.OK);
    }
    @GetMapping("/{ruteId}/orders")
    public ResponseEntity<List<Order>> getOrdersForRute(@PathVariable Long ruteId) {
        log.info("getOrdersForRute");
        List<Order> orders = orderService.getOrdersForRute(ruteId);
        log.info("getOrdersForRute amount of orders {}", orders.size());
        return ResponseEntity.ok(orders);
    }
    @PostMapping("/add-order")
    public ResponseEntity<OrderDTO> addOrderToRute( @RequestBody OrderDTO orderDTO){
        log.info("addOrderToRute Called RequestBody: {}", orderDTO);
        orderService.createOrder(orderDTO);
        return new ResponseEntity<>(orderDTO, HttpStatus.CREATED);
    }
    @PutMapping("/update-order")
    public ResponseEntity<OrderDTO> updateOrder(@RequestBody OrderDTO orderDTO){
        log.info("Updating orders {}" , orderDTO.toString());
        orderService.updateOrder(orderDTO);
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }
 }
