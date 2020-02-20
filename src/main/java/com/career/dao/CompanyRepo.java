package com.career.dao;

import com.career.entities.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CompanyRepo extends JpaRepository<CompanyEntity, UUID> {

    @Query("select c from CompanyEntity c join fetch c.reviewSalaryEntities")
    List<CompanyEntity> findAllWithReviewCompany();

    @Query("select c from CompanyEntity c join fetch c.reviewSalaryEntities")
    List<CompanyEntity> findAllWithReviewSalary();

    @Query("select c from CompanyEntity c join fetch c.reviewSelectionEntities")
    List<CompanyEntity> findAllWithReviewSelection();

    @Query("select c from CompanyEntity c join fetch c.reviewSalaryEntities where c.id=:id")
    CompanyEntity findAllWithReviewSalaryById( @Param("id") UUID id);
}
