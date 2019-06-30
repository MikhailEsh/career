package com.career.dao;

import com.career.entities.ReviewCompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewCompanyRepo extends JpaRepository<ReviewCompanyEntity, UUID> {
}
