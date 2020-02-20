package com.career.service;

import com.career.dao.ReviewCompanyRepo;
import com.career.dao.ReviewSalaryRepo;
import com.career.dao.ReviewSelectionRepo;
import com.career.dto.enumDto.*;
import com.career.entities.CompanyEntity;
import com.career.entities.ReviewCompanyEntity;
import com.career.entities.ReviewSalaryEntity;
import com.career.entities.ReviewSelectionEntity;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Log4j2
@Service
@Transactional
public class ReviewSrv {

    @Autowired
    private ReviewCompanyRepo reviewCompanyRepo;
    @Autowired
    private ReviewSalaryRepo reviewSalaryRepo;
    @Autowired
    private ReviewSelectionRepo reviewSelectionRepo;
    @Autowired
    private CSVParser csvParser;

    public void createReviewCompany(UUID companyId,
                                    String name,
                                    Integer commonScale,
                                    Integer salaryScale,
                                    Integer leadershipScale,
                                    Integer cultureScale,
                                    Integer careerScale,
                                    Integer balanceWorkHomeScale,
                                    String recommend,
                                    String plus,
                                    String minuses,
                                    String status,
                                    String position,
                                    Integer useful,
                                    UUID userId,
                                    String dateWork,
                                    String workDepartment,
                                    String managerAdvice) {


        reviewCompanyRepo.save(new ReviewCompanyEntity(name, commonScale, salaryScale, leadershipScale, cultureScale
                , careerScale, balanceWorkHomeScale, RecommendEnum.valueOf(recommend), plus, minuses,
                StatusEmployeeEnum.valueOf(status), position, useful, userId, DateWorkEnum.valueOf(dateWork),
                workDepartment, managerAdvice, new CompanyEntity(companyId)));
    }

    public void createReviewSalary(String position,
                                   Integer salaryRubInMonth,
                                   UUID companyId,
                                   UUID userId) {
        reviewSalaryRepo.save(new ReviewSalaryEntity(position, salaryRubInMonth, userId,
                new CompanyEntity(companyId)));
    }

    public void createReviewSelection(Boolean selectIn,
                                      String positiveExperience,
                                      Integer selectionProcess,
                                      String howGetInterview,
                                      LocalDate dateInterview,
                                      String question,
                                      String typeInterview,
                                      String tests,
                                      Integer difficult,
                                      Integer useful,
                                      UUID companyId,
                                      UUID userId,
                                      String overview,
                                      String timeTaken,
                                      String reviewTitle) {

        reviewSelectionRepo.save(new ReviewSelectionEntity(selectIn,
                RecommendEnum.valueOf(positiveExperience),
                selectionProcess,
                HowToGetIntervew.valueOf(howGetInterview),
                dateInterview,
                question,
                TypeOfInterviewOrTestEnum.valueOf(typeInterview),
                TypeOfInterviewOrTestEnum.valueOf(tests),
                difficult,
                useful,
                userId,
                overview,
                TimeTakenEnum.valueOf(timeTaken),
                reviewTitle,
                new CompanyEntity(companyId)));
    }

    public boolean saveCommonCsv(MultipartFile file) throws Exception {
        List<ReviewCompanyEntity> review = csvParser.parseEntities(file, ReviewCompanyEntity.class);
        reviewCompanyRepo.saveAll(review);
        return true;
    }

    public boolean saveSalaryCsv(MultipartFile file) throws Exception {
        List<ReviewSalaryEntity> review = csvParser.parseEntities(file, ReviewSalaryEntity.class);
        reviewSalaryRepo.saveAll(review);
        return true;
    }

    public boolean saveSelectionCsv(MultipartFile file) throws Exception {
        List<ReviewSelectionEntity> review = csvParser.parseEntities(file, ReviewSelectionEntity.class);
        reviewSelectionRepo.saveAll(review);
        return true;
    }
}
