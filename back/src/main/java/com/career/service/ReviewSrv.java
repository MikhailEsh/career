package com.career.service;

import com.career.dao.ReviewCompanyRepo;
import com.career.dao.ReviewSalaryRepo;
import com.career.dao.ReviewSelectionRepo;
import com.career.entities.ReviewCompanyEntity;
import com.career.entities.ReviewSalaryEntity;
import com.career.entities.ReviewSelectionEntity;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

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

    public Boolean createReviewCompany(ReviewCompanyEntity reviewCompany) {
        reviewCompanyRepo.save(reviewCompany);
        return true;
    }

    public Boolean createReviewSalary(ReviewSalaryEntity reviewSalary) {
        reviewSalaryRepo.save(reviewSalary);
        return true;
    }

    public Boolean createReviewSelection(ReviewSelectionEntity reviewSelection) {
        reviewSelectionRepo.save(reviewSelection);
        return true;
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
