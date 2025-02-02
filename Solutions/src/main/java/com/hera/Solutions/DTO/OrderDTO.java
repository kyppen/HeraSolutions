package com.hera.Solutions.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hera.Solutions.Entity.Rute;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class OrderDTO {
    private String id;
    private String transportFirm;
    private String Sender; // Should be an object with more info
    private String receiver; // Should be an object with more info
    private String pickupTime; //Should be stored as a date instead of a String?
    private String deliveryTime; //Should be stored as a date instead of a String?
    private int packageCount;
    private Long ruteId;
    private int index;
}