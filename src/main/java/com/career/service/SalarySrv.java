package com.career.service;

import com.career.dao.ReviewSalaryRepo;
import com.career.dto.SalaryDto;
import com.career.entities.ReviewSalaryEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
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
    private EntityManager em;

    public Map<String, Double> findAllAggregationSalary() {
        return aggregationSalary(reviewSalaryRepo.findAllSalaries());
    }

    private Map<String, Double> aggregationSalary(List<ReviewSalaryEntity> salaries) {
        Map<String, Double> aggregatedSalaries = salaries.stream()
                .collect(Collectors.groupingBy(ReviewSalaryEntity::getPosition,
                        Collectors.averagingInt(ReviewSalaryEntity::getSalaryRubInMonth)));
        return aggregatedSalaries;
    }

    public List<SalaryDto> findAllAggregationSalaryByCompany(UUID id) {

        Query q = em.createNativeQuery("select position,min(salaryrubinmonth) min," +
                "sum(salaryrubinmonth)/count(salaryrubinmonth) avr,max(salaryrubinmonth) max from\n" +
                "review_salary where is_approved is true and company_id =\'" + id + "\' group by position");
        List<Object[]> salaryRaw = q.getResultList();
        List<SalaryDto> salaries = new ArrayList<>();
        for (Object[] a : salaryRaw) {
            salaries.add(new SalaryDto(a[0].toString(), Integer.valueOf(a[1].toString()),
                    Integer.valueOf(a[2].toString()), Integer.valueOf(a[3].toString())));
        }
        return salaries;
    }
}
