package com.career.dao;

import com.career.entities.ReviewSalaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewSalaryRepo extends JpaRepository<ReviewSalaryEntity, UUID> {
}
