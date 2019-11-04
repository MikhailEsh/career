package com.career.dao;

import com.career.entities.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CompanyRepo extends JpaRepository<CompanyEntity, UUID> {

}
