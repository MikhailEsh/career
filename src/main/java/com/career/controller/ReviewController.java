package com.career.controller;

import com.career.entities.ReviewCompanyEntity;
import com.career.entities.ReviewSalaryEntity;
import com.career.entities.ReviewSelectionEntity;
import com.career.service.CountSrv;
import com.career.service.ReviewSrv;
import com.career.utils.JsonPostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Controller
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewSrv reviewSrv;
    @Autowired
    private CountSrv countSrv;

    @JsonPostMapping(value = "/common")
    public boolean getEnterpriseSummary(@RequestParam("reviewCompany") ReviewCompanyEntity reviewCompany) {
        return reviewSrv.createReviewCompany(reviewCompany);
    }

    @JsonPostMapping(value = "/salary")
    public boolean getEnterpriseSummary(@RequestParam("reviewSalary") ReviewSalaryEntity reviewSalary) {
        return reviewSrv.createReviewSalary(reviewSalary);
    }

    @JsonPostMapping(value = "/selection")
    public boolean getEnterpriseSummary(@RequestParam("reviewCompany") ReviewSelectionEntity reviewSelection) {
        return reviewSrv.createReviewSelection(reviewSelection);
    }

    @JsonPostMapping("/common-csv")
    public void commonCsvUpload(@RequestParam("file") MultipartFile file) throws Exception {
        reviewSrv.saveCommonCsv(file);
    }

    @JsonPostMapping("/salary-csv")
    public void salaryCsvUpload(@RequestParam("file") MultipartFile file) throws Exception {
        reviewSrv.saveSalaryCsv(file);
    }

    @JsonPostMapping("/selection-csv")
    public void selectionCsvUpload(@RequestParam("file") MultipartFile file) throws Exception {
        reviewSrv.saveSelectionCsv(file);
    }

    @JsonPostMapping("/update-count-by-id")
    public void updateCountReview(@RequestParam("companyId")UUID id) {
        countSrv.updateCountById(id);
    }
    @JsonPostMapping("/update-count-all")
    public void updateCountReview() {
        countSrv.updateCountAll();
    }
}
