package com.hera.Solutions;


import com.hera.Solutions.DTO.RuteDTO;
import com.hera.Solutions.Entity.Rute;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RuteService {

    private final RuteRepo ruteRepo;

    public Rute createRute(String ruteName) {
        Rute rute = new Rute();
        rute.setRuteName(ruteName);
        return ruteRepo.save(rute);
    }

    public List<Rute> allRute() {
        return ruteRepo.findAll();
    }

    public Rute getRuteById(Long RuteId) {
        if (ruteRepo.existsById(RuteId)) {
            return ruteRepo.findById(RuteId).orElseThrow();
        }else{
            return null;
        }
    }
}
