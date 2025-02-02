package com.hera.Solutions.DTO;

import com.hera.Solutions.Entity.Rute;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderDTO {
    private String id;
    private String transportFirm;
    private String Sender;
    private String receiver;
    private String pickupTime;
    private String deliveryTime;
    private int packageCount;
    private Long ruteId;
    private int index;
}