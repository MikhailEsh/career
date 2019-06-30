package com.career.controller;

import com.career.entities.ReviewCompanyEntity;
import com.career.entities.ReviewSalaryEntity;
import com.career.entities.ReviewSelectionEntity;
import com.career.service.ReviewSrv;
import com.career.utils.JsonPostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
@RequestMapping("/api/review")
public class ReviewController {

@Autowired
private ReviewSrv reviewSrv;

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
    
}
