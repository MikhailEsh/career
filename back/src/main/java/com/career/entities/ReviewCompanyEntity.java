package com.career.entities;

import com.career.dto.enumDto.DateWorkEnum;
import com.career.dto.enumDto.RecommendEnum;
import com.career.dto.enumDto.StatusEmployeeEnum;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "review")
public class ReviewCompanyEntity {
    @Id
    @Column(name = "id")
    private UUID id;
    @Column(name = "name")
    private String name;
    @Column(name = "common_scale")
    private Integer commonScale;
    @Column(name = "salary_scale")
    private Integer salaryScale;
    @Column(name = "leadership_scale")
    private Integer leadershipScale;
    @Column(name = "culture_scale")
    private Integer cultureScale;
    @Column(name = "career_scale")
    private Integer careerScale;
    @Column(name = "balance_scale")
    private Integer balanceWorkHomeScale;
    @Column(name = "recommend")
    private RecommendEnum recommend;
    @Column(name = "plus")
    private String plus;
    @Column(name = "minuses")
    private String minuses;
    @Column(name = "date")
    private Date date;
    @Column(name = "status")
    private StatusEmployeeEnum status;
    @Column(name = "position")
    private String position;
    @Column(name = "useful")
    private Integer useful;
    @Column(name = "user")
    private UUID user;
    @Column(name = "approved")
    private Boolean approved;
    @Column(name = "company")
    private UUID company;
    @Column(name = "datework")
    private DateWorkEnum dateWork;
    @Column(name = "workdepartment")
    private String workDepartment;
    @Column(name="management_advice")
    private String managementAdvice;
}
