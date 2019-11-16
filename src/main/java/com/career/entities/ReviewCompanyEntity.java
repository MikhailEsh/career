package com.career.entities;

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
import java.sql.Timestamp;
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
    @Column(name = "approved")
    private Boolean approved;
    @Column(name = "datework")
    private DateWorkEnum dateWork;
    @Column(name = "workdepartment")
    private String workDepartment;
    @Column(name="management_advice")
    private String managementAdvice;
    @Column(name = "time_added")
    private Timestamp timeAdded;
    @Override
    public UUID getId() {
        return id;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="company_id", nullable=false)
    @LazyToOne(LazyToOneOption.NO_PROXY)
    @EqualsAndHashCode.Exclude
    @Fetch(FetchMode.JOIN)
    private CompanyEntity company;
}
