package com.career.service;

import com.career.entities.ReviewCompanyEntity;
import com.career.entities.ReviewSalaryEntity;
import com.career.entities.ReviewSelectionEntity;
import org.springframework.stereotype.Service;
@Service
public class ReviewSrv {
   public Boolean createReviewCompany(ReviewCompanyEntity reviewCompany){
       return true;
   }

    public Boolean createReviewSalary(ReviewSalaryEntity reviewSelection){
        return true;
    }

    public Boolean createReviewSelection(ReviewSelectionEntity reviewSelection)
    {
        return true;
    }
}
