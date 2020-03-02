package com.career.service;


import com.career.dao.CompanyRepo;
import com.career.dto.enumDto.HowToGetIntervew;
import com.career.entities.CompanyEntity;
import com.career.entities.ReviewCompanyEntity;
import com.career.entities.ReviewSelectionEntity;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Log4j2
@Service
public class CompanySrv {
    @Autowired
    private CompanyRepo companyRepo;


    public void updateCompanyMetaDataById(UUID coompanyId) {
        CompanyEntity company = companyRepo.findById(coompanyId).get();
        updateCompany(company);
        updateAverageData(company);
        companyRepo.save(company);
    }

    public void updateCompanyMetaDataAll() {
        List<CompanyEntity> companies = companyRepo.findAll();
        companies.forEach(this::updateCompany);
        companies.forEach(this::updateAverageData);
        log.info("Start update");
        companyRepo.saveAll(companies);
        log.info("Finish update");
    }

    private void updateCompany(CompanyEntity company) {
        company.setCountCompanyReview(company.getReviewCompanyEntities().size());
        company.setCountSalaryReview(company.getReviewSalaryEntities().size());
        company.setCountSelectionReview(company.getReviewSelectionEntities().size());
    }

    private void updateAverageData(CompanyEntity company) {
        if (company.getReviewCompanyEntities().size() != 0) {
            List<ReviewCompanyEntity> reviews = company.getReviewCompanyEntities().stream()
                    .filter(ReviewCompanyEntity::getIsApproved).collect(Collectors.toList());
            double countCompanyReview = (double) reviews.size();//todo maybe need refactoring
            company.setAverageBalanceScale((reviews.stream().filter(f -> f.getBalanceWorkHomeScale() != null)
                    .mapToInt(ReviewCompanyEntity::getBalanceWorkHomeScale).sum() / countCompanyReview));
            company.setAverageCareerScale((reviews.stream().filter(f -> f.getCareerScale() != null)
                    .mapToInt(ReviewCompanyEntity::getCareerScale).sum() / countCompanyReview));
            company.setAverageCultureScale((reviews.stream().filter(f -> f.getCultureScale() != null)
                    .mapToInt(ReviewCompanyEntity::getCultureScale).sum() / countCompanyReview));
            company.setAverageLeadershipScale((reviews.stream().filter(f -> f.getLeadershipScale() != null)
                    .mapToInt(ReviewCompanyEntity::getLeadershipScale).sum() / countCompanyReview));
            company.setAverageSalaryScale((reviews.stream().filter(f -> f.getSalaryScale() != null)
                    .mapToInt(ReviewCompanyEntity::getSalaryScale).sum() / countCompanyReview));
            company.setAverageCommonScale((reviews.stream().filter(f -> f.getCommonScale() != null)
                    .mapToInt(ReviewCompanyEntity::getCommonScale).sum() / countCompanyReview));

            int countSelectionReview = company.getReviewSelectionEntities().size();//todo maybe need refactoring
            if (countSelectionReview != 0) {
                List<ReviewSelectionEntity> selectionReviews = company.getReviewSelectionEntities().stream()
                        .filter(ReviewSelectionEntity::getIsApproved).collect(Collectors.toList());
                company.setAverageSelectionDifficultScale((selectionReviews.stream().filter(f -> f.getDifficult() != null)
                        .mapToInt(ReviewSelectionEntity::getDifficult).sum() / Double.valueOf(countSelectionReview)));

                Long respondedOnlinePercent = company.getReviewSelectionEntities().stream()
                        .filter(ReviewSelectionEntity::getIsApproved)
                        .filter(f -> f.getHowGetInterview() == HowToGetIntervew.RESPONDED_ONLINE)
                        .count() * 100 / countSelectionReview;
                Long careerEventPercent = company.getReviewSelectionEntities().stream()
                        .filter(ReviewSelectionEntity::getIsApproved)
                        .filter(f -> f.getHowGetInterview() == HowToGetIntervew.CAREER_EVENT)
                        .count() * 100 / countSelectionReview;
                Long invitedCoworkerOfTheCompanyPercent = company.getReviewSelectionEntities().stream()
                        .filter(ReviewSelectionEntity::getIsApproved)
                        .filter(f -> f.getHowGetInterview() == HowToGetIntervew.INVITED_COWORKER_OF_THE_COMPANY)
                        .count() * 100 / countSelectionReview;
                Long throughTheAgencyPercent = company.getReviewSelectionEntities().stream()
                        .filter(ReviewSelectionEntity::getIsApproved)
                        .filter(f -> f.getHowGetInterview() == HowToGetIntervew.THROUGH_THE_AGENCY)
                        .count() * 100 / countSelectionReview;
                Long otherPercent=100L-(respondedOnlinePercent+careerEventPercent
                        +invitedCoworkerOfTheCompanyPercent+throughTheAgencyPercent);

                company.setHowToGetSelectionRespondedOnlinepercent(respondedOnlinePercent);
                company.setHowToGetSelectionCareerEventPercent(careerEventPercent);
                company.setHowToGetSelectionInvitedCoworkerOfTheCompanyPercent(invitedCoworkerOfTheCompanyPercent);
                company.setHowToGetSelectionThroughTheAgencyPercent(throughTheAgencyPercent);
                company.setHowToGetSelectionOtherPercent(otherPercent);

                Long usefulGoodPercent = company.getReviewSelectionEntities().stream()
                        .filter(ReviewSelectionEntity::getIsApproved)
                        .filter(f -> f.getUseful() == 2).count() * 100 / countSelectionReview;
                Long usefulBadPercent = company.getReviewSelectionEntities().stream()
                        .filter(ReviewSelectionEntity::getIsApproved)
                        .filter(f -> f.getUseful() == 0).count() * 100 / countSelectionReview;
                Long usefulNeutralPercent =100L - (usefulBadPercent + usefulGoodPercent);

                company.setUsefulBadPercent(usefulBadPercent);
                company.setUsefulGoodPercent(usefulGoodPercent);
                company.setUsefulNeutralPercent(usefulNeutralPercent);


            } else {
                company.setHowToGetSelectionRespondedOnlinepercent(0L);
                company.setHowToGetSelectionOtherPercent(0L);
                company.setHowToGetSelectionThroughTheAgencyPercent(0L);
                company.setHowToGetSelectionInvitedCoworkerOfTheCompanyPercent(0L);
                company.setHowToGetSelectionCareerEventPercent(0L);
                company.setUsefulBadPercent(0L);
                company.setUsefulNeutralPercent(0L);
                company.setUsefulGoodPercent(0L);
            }
        }
    }
}
