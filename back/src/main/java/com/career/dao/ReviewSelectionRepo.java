package com.career.dao;

import com.career.entities.ReviewSelectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewSelectionRepo extends JpaRepository<ReviewSelectionEntity, UUID> {
}
