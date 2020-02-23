package com.career.controller;

import com.career.service.CompanySrv;
import com.career.service.ReviewSrv;
import com.career.service.SalarySrv;
import com.career.utils.JsonGetMapping;
import com.career.utils.JsonPostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
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
    public void getEnterpriseSummary(
            @RequestParam("company_id") UUID companyId,
            @RequestParam("name") String name,
            @RequestParam("commonScale") Integer commonScale,
            @RequestParam("salaryScale") Integer salaryScale,
            @RequestParam("leadershipScale") Integer leadershipScale,
            @RequestParam("cultureScale") Integer cultureScale,
            @RequestParam("careerScale") Integer careerScale,
            @RequestParam("balanceWorkHomeScale") Integer balanceWorkHomeScale,
            @RequestParam("recommend") String recommend,
            @RequestParam("plus") String plus,
            @RequestParam("minuses") String minuses,
            @RequestParam("status") String status,
            @RequestParam("position") String position,
            @RequestParam("useful") Integer useful,
            @RequestParam("user_id") UUID userId,
            @RequestParam("dateWork") String dateWork,
            @RequestParam("workDepartment") String workDepartment,
            @RequestParam("managementAdvice") String managementAdvice

            ) {
       reviewSrv.createReviewCompany(companyId,
               name,
               commonScale,
               salaryScale,
               leadershipScale,
               cultureScale,
               careerScale,
               balanceWorkHomeScale,
               recommend,
               plus,
               minuses,
               status,
               position,
               useful,
               userId,
               dateWork,
               workDepartment,
               managementAdvice);
    }

    @JsonPostMapping(value = "/salary")
    public void getEnterpriseSummary(@RequestParam("position") String position,
                                        @RequestParam("salaryrubinmonth") Integer salaryRubInMonth,
                                        @RequestParam("company_id") UUID companyId ,
                                        @RequestParam("user_id") UUID userId) {
        reviewSrv.createReviewSalary(position,salaryRubInMonth,companyId,userId);
    }

    @JsonPostMapping(value = "/selection")
    public void getEnterpriseSummary(@RequestParam("select_in") Boolean selectIn,
                                        @RequestParam("positive_experience") String positiveExperience,
                                        @RequestParam("selection_process") Integer selectionProcess,
                                        @RequestParam("how_get_interview") String howGetInterview,
                                        @RequestParam("date_interview") LocalDate dateInterview,
                                        @RequestParam("question") String question,
                                        @RequestParam("type_interview") String typeInterview,
                                        @RequestParam("tests") String tests,
                                        @RequestParam("difficult") Integer difficult,
                                        @RequestParam("useful")  Integer useful,
                                        @RequestParam("company_id") UUID companyId,
                                        @RequestParam("user_id") UUID userId,
                                        @RequestParam("overview") String  overview,
                                        @RequestParam("time_taken") String  timeTaken,
                                        @RequestParam("review_title") String reviewTitle

                                        ) {
        reviewSrv.createReviewSelection(selectIn,
                positiveExperience,
                selectionProcess,
                howGetInterview,
                dateInterview,
                question,
                typeInterview,
                tests,
                difficult,
                useful,
                companyId,
                userId,
                overview,
                timeTaken,
                reviewTitle);
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
