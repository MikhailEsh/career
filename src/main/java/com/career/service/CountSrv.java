package com.career.service;


import com.career.dao.CompanyRepo;
import com.career.entities.CompanyEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class CountSrv {
    @Autowired
    private CompanyRepo companyRepo;


    public void updateCountById(UUID coompanyId) {
        CompanyEntity company = companyRepo.findById(coompanyId).get();
        updateCompany(company);
        companyRepo.save(company);
    }

    public void updateCountAll() {
        List<CompanyEntity> companies = companyRepo.findAll();
        companies.forEach(this::updateCompany);
        companyRepo.saveAll(companies);
    }

    private void updateCompany(CompanyEntity company) {
        company.setCountCompanyReview(company.getReviewCompanyEntities().size());
        company.setCountSalaryReview(company.getReviewSalaryEntities().size());
        company.setCountSelectionReview(company.getReviewSelectionEntities().size());
    }
}
