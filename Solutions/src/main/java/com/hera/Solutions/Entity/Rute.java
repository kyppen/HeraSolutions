package com.hera.Solutions.Entity;

import com.hera.Solutions.DTO.RuteDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
@NoArgsConstructor
public class Rute {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String ruteName;

    public Rute(RuteDTO ruteDTO){
        this.ruteName = ruteDTO.getRuteName();
    }
}
