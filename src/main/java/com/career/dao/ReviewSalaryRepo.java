package com.career.dao;

import com.career.entities.ReviewSalaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReviewSalaryRepo extends JpaRepository<ReviewSalaryEntity, UUID> {
    @Query("from ReviewSalaryEntity")//todo добавить is_apr
    List<ReviewSalaryEntity> findAllSalaries();
}
