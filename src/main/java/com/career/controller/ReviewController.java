package com.career.controller;

import com.career.dto.ImportCommonReviewDto;
import com.career.dto.ImportSelectionReviewDto;
import com.career.service.CompanySrv;
import com.career.service.ReviewSrv;
import com.career.service.SalarySrv;
import com.career.utils.JsonGetMapping;
import com.career.utils.JsonPostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewSrv reviewSrv;
    @Autowired
    private CompanySrv companySrv;
    @Autowired
    private SalarySrv salarySrv;

    @JsonPostMapping(value = "/common")
    public void getEnterpriseSummary(@RequestBody ImportCommonReviewDto feedBack) {
       reviewSrv.createReviewCompany(feedBack);
    }


    @JsonPostMapping(value = "/selection")
    public void getEnterpriseSummary(@RequestBody ImportSelectionReviewDto feedBack) {
        reviewSrv.createReviewSelection(feedBack);
    }

    @JsonPostMapping("/update-count-by-id")
    public void updateCountReview(@RequestParam("companyId") UUID id) {
        companySrv.updateCompanyMetaDataById(id);
    }

    @JsonPostMapping("/update-count-all")
    public void updateCountReview() {
        companySrv.updateCompanyMetaDataAll();
    }

    @JsonGetMapping("/aggregation-salary-all")
    public Map<String, Double> aggregationSalaryAll() {
        return salarySrv.findAllAggregationSalary();
    }

    @JsonGetMapping("/aggregation-salary-by-id")
    public Map<String, Double> aggregationSalary(@RequestParam("companyId") UUID id) {
        return salarySrv.findAllAggregationSalaryByCompany(id);
    }
}
