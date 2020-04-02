package com.career.service;

import com.career.dao.ReviewCompanyRepo;
import com.career.dao.ReviewSalaryRepo;
import com.career.dao.ReviewSelectionRepo;
import com.career.dto.ImportCommonReviewDto;
import com.career.dto.ImportSelectionReviewDto;
import com.career.entities.CompanyEntity;
import com.career.entities.ReviewCompanyEntity;
import com.career.entities.ReviewSalaryEntity;
import com.career.entities.ReviewSelectionEntity;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
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

    public void createReviewCompany( ImportCommonReviewDto feedBack) {


        reviewCompanyRepo.save(new ReviewCompanyEntity(feedBack));
        reviewSalaryRepo.save(new ReviewSalaryEntity(feedBack));


    }

    public void createReviewSalary(String position,
                                   Integer salaryRubInMonth,
                                   UUID companyId,
                                   UUID userId) {
        reviewSalaryRepo.save(new ReviewSalaryEntity(position, salaryRubInMonth, userId,
                new CompanyEntity(companyId)));
    }

    public void createReviewSelection(ImportSelectionReviewDto feedBack) {

        reviewSelectionRepo.save(new ReviewSelectionEntity(feedBack));
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
