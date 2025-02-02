package com.hera.Solutions.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hera.Solutions.DTO.OrderDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String transportFirm;
    private String sender;  // Should be an object with more info
    private String receiver; // Should be an object with more info
    private String pickupTime; //Should be stored as a date instead of a String?
    private String deliveryTime; //Should be stored as a date instead of a String?
    private int packageCount;
    private Long ruteId;
    private int index;

    public Order(OrderDTO orderDTO){
        this.transportFirm = orderDTO.getTransportFirm();
        this.deliveryTime = orderDTO.getDeliveryTime();
        this.pickupTime = orderDTO.getPickupTime();
        this.receiver = orderDTO.getReceiver();
        this.sender = orderDTO.getSender();
        this.ruteId = orderDTO.getRuteId();
        this.index = orderDTO.getIndex();
    }
}
