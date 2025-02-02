package com.hera.Solutions.Entity;

import com.hera.Solutions.DTO.OrderDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String sender;
    private String receiver;
    private String pickupTime;
    private String deliveryTime;
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
