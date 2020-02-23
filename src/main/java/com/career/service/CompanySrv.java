package com.career.service;


import com.career.dao.CompanyRepo;
import com.career.entities.CompanyEntity;
import com.career.entities.ReviewCompanyEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class CompanySrv {
    @Autowired
    private CompanyRepo companyRepo;


    public void updateCompanyMetaDataById(UUID coompanyId) {
        CompanyEntity company = companyRepo.findById(coompanyId).get();
        updateCompany(company);
        updateAverageRating(company);
        companyRepo.save(company);
    }

    public void updateCompanyMetaDataAll() {
        List<CompanyEntity> companies = companyRepo.findAll();
        companies.forEach(this::updateCompany);
        companies.forEach(this::updateAverageRating);
        companyRepo.saveAll(companies);
    }

    private void updateCompany(CompanyEntity company) {
        company.setCountCompanyReview(company.getReviewCompanyEntities().size());
        company.setCountSalaryReview(company.getReviewSalaryEntities().size());
        company.setCountSelectionReview(company.getReviewSelectionEntities().size());
    }

    private void updateAverageRating(CompanyEntity company) {
        if (company.getReviewCompanyEntities().size() != 0) {
            List<ReviewCompanyEntity> reviews = company.getReviewCompanyEntities().stream()
                    .filter(ReviewCompanyEntity::getIsApproved).collect(Collectors.toList());
            double count = (double) reviews.size();//todo maybe need refactoring
            company.setAverageBalanceScale((reviews.stream().filter(f -> f.getBalanceWorkHomeScale() != null).mapToInt(ReviewCompanyEntity::getBalanceWorkHomeScale).sum() / count));
            company.setAverageCareerScale((reviews.stream().filter(f -> f.getCareerScale() != null).mapToInt(ReviewCompanyEntity::getCareerScale).sum() / count));
            company.setAverageCultureScale((reviews.stream().filter(f -> f.getCultureScale() != null).mapToInt(ReviewCompanyEntity::getCultureScale).sum() / count));
            company.setAverageLeadershipScale((reviews.stream().filter(f -> f.getLeadershipScale() != null).mapToInt(ReviewCompanyEntity::getLeadershipScale).sum() / count));
            company.setAverageSalaryScale((reviews.stream().filter(f -> f.getSalaryScale() != null).mapToInt(ReviewCompanyEntity::getSalaryScale).sum() / count));
            company.setAverageCommonScale((reviews.stream().filter(f -> f.getCommonScale() != null).mapToInt(ReviewCompanyEntity::getCommonScale).sum() / count));
        }
    }
}
