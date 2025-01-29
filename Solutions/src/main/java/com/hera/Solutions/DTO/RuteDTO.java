package com.hera.Solutions.DTO;

import com.hera.Solutions.Entity.Order;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RuteDTO {
    private String ruteName;
    private List<Order> OrderList;
}
