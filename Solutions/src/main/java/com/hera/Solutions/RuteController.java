package com.hera.Solutions;


import com.hera.Solutions.DTO.OrderDTO;
import com.hera.Solutions.DTO.RuteDTO;
import com.hera.Solutions.Entity.Order;
import com.hera.Solutions.Entity.Rute;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class RuteController {
    private final RuteService ruteService;
    private final OrderService orderService;
    @PostMapping("/rute")
    public ResponseEntity<Rute> createRute(@RequestBody RuteDTO ruteDTO) {
        Rute createdRute = ruteService.createRute(ruteDTO);
        return new ResponseEntity<>(createdRute, HttpStatus.CREATED);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Rute>> allRutes(){
        return new ResponseEntity<>(ruteService.allRute(), HttpStatus.OK);
    }
    @GetMapping("/{ruteId}/orders")
    public ResponseEntity<List<Order>> getOrdersForRute(@PathVariable Long ruteId) {
        List<Order> orders = orderService.getOrdersForRute(ruteId);
        return ResponseEntity.ok(orders);
    }
 }
