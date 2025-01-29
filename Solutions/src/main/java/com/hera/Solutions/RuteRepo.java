package com.hera.Solutions;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.hera.Solutions.Entity.Rute;

@Repository
public interface RuteRepo extends JpaRepository<Rute, Long>{
}
