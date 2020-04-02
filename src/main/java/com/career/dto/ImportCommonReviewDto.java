package com.career.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImportCommonReviewDto {

    private UUID companyId;
    private String companyName;
    private String title;
    private Integer salaryRubInMonth;
    private Integer commonScale;
    private Integer salaryScale;
    private Integer leadershipScale;
    private Integer cultureScale;
    private Integer careerScale;
    private Integer balanceWorkHomeScale;
    private String plus;
    private String minuses;
    private String status;
    private String position;
    private Integer useful;
    private String dateWork;
    private String workDepartment;
    private String managementAdvice;
}
