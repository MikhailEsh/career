package com.career.entities;

import com.career.dto.ImportCommonReviewDto;
import com.career.dto.enumDto.DateWorkEnum;
import com.career.dto.enumDto.RecommendEnum;
import com.career.dto.enumDto.StatusEmployeeEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jraphql.cn.wzvtcsoft.x.bos.domain.GQLEntity;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyToOne;
import org.hibernate.annotations.LazyToOneOption;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "review_company")
public class ReviewCompanyEntity implements GQLEntity {
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
    private LocalDate date;
    @Column(name = "status")
    private StatusEmployeeEnum status;
    @Column(name = "position")
    private String position;
    @Column(name = "useful")
    private Integer useful;
    @Column(name = "user_id")
    private UUID userId;
    @Column(name = "is_approved")
    private Boolean isApproved;
    @Column(name = "datework")
    private DateWorkEnum dateWork;
    @Column(name = "workdepartment")
    private String workDepartment;
    @Column(name="management_advice")
    private String managementAdvice;
    @Column(name = "time_added")
    private LocalDateTime timeAdded;
    @Override
    public UUID getId() {
        return id;
    }

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.DETACH )
    @JoinColumn(name="company_id", nullable=false)
    @LazyToOne(LazyToOneOption.NO_PROXY)
    @EqualsAndHashCode.Exclude
    @Fetch(FetchMode.JOIN)
    private CompanyEntity company;




    public ReviewCompanyEntity(String name,
                               Integer commonScale,
                               Integer salaryScale,
                               Integer leadershipScale,
                               Integer cultureScale,
                               Integer careerScale,
                               Integer balanceWorkHomeScale,
                               RecommendEnum recommend,
                               String plus,
                               String minuses,
                               StatusEmployeeEnum status,
                               String position,
                               Integer useful,
                               UUID userId,
                               DateWorkEnum dateWork,
                               String workDepartment,
                               String managementAdvice,
                               CompanyEntity company) {
        this.id=UUID.randomUUID();
        this.name = name;
        this.commonScale = commonScale;
        this.salaryScale = salaryScale;
        this.leadershipScale = leadershipScale;
        this.cultureScale = cultureScale;
        this.careerScale = careerScale;
        this.balanceWorkHomeScale = balanceWorkHomeScale;
        this.recommend = recommend;
        this.plus = plus;
        this.minuses = minuses;
        this.status = status;
        this.position = position;
        this.useful = useful;
        this.userId = userId;
        this.dateWork = dateWork;
        this.workDepartment = workDepartment;
        this.managementAdvice = managementAdvice;
        this.company = company;
        this.timeAdded= LocalDateTime.now();
        this.isApproved=false;
    }

    public ReviewCompanyEntity(ImportCommonReviewDto feedBack) {
        this.id=UUID.randomUUID();
        this.name = feedBack.getTitle();
        this.commonScale = feedBack.getCommonScale();
        this.salaryScale = feedBack.getSalaryScale();
        this.leadershipScale = feedBack.getLeadershipScale();
        this.cultureScale = feedBack.getCultureScale();
        this.careerScale = feedBack.getCareerScale();
        this.balanceWorkHomeScale = feedBack.getBalanceWorkHomeScale();
        this.recommend =RecommendEnum.NEUTRAL;
        this.plus = feedBack.getPlus();
        this.minuses = feedBack.getMinuses();
        this.status = StatusEmployeeEnum.valueOf(feedBack.getStatus());
        this.position = feedBack.getPosition();
        this.useful = feedBack.getUseful();
        this.userId =UUID.fromString("94ee963b-8f4d-48ff-9b4f-feef753fd27f");
//        SecurityConfig.getCurrentUser();todo
        this.dateWork = DateWorkEnum.valueOf(feedBack.getDateWork());
        this.workDepartment = feedBack.getWorkDepartment();
        this.managementAdvice = feedBack.getManagementAdvice();
        this.company = new CompanyEntity(feedBack.getCompanyId());
        this.timeAdded= LocalDateTime.now();
        this.isApproved=false;
    }
}
