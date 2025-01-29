package com.hera.Solutions.DTO;

import com.hera.Solutions.Entity.Rute;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDTO {
    private String transportFirm;
    private String Sender;
    private String receiver;
    private String pickupTime;
    private String deliveryTime;
    private int packageCount;
    private Long ruteId;
}