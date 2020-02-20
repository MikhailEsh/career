package com.career.service;

import com.career.dao.CompanyRepo;
import com.career.dao.ReviewSalaryRepo;
import com.career.entities.ReviewSalaryEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SalarySrv {

    @Autowired
    private ReviewSalaryRepo reviewSalaryRepo;
    @Autowired
    private CompanyRepo companyRepo;

    public Map<String, Double> findAllAggregationSalary() {
        return aggregationSalary(reviewSalaryRepo.findAllSalaries());
    }

    private Map<String, Double> aggregationSalary(List<ReviewSalaryEntity> salaries) {
        Map<String, Double> aggregatedSalaries = salaries.stream()
                .collect(Collectors.groupingBy(ReviewSalaryEntity::getPosition,
                        Collectors.averagingInt(ReviewSalaryEntity::getSalaryRubInMonth)));
        return aggregatedSalaries;
    }

    public Map<String, Double> findAllAggregationSalaryByCompany(UUID id) {
        return aggregationSalary(new ArrayList<>(companyRepo.findAllWithReviewSalaryById(id).getReviewSalaryEntities()));
    }
}
