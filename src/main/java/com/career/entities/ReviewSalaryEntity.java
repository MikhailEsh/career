package com.career.entities;

import com.career.dto.ImportCommonReviewDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jraphql.cn.wzvtcsoft.x.bos.domain.GQLEntity;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyToOne;
import org.hibernate.annotations.LazyToOneOption;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "review_salary")
public class ReviewSalaryEntity implements Serializable,GQLEntity {
    @Id
    @Column(name = "id")
    private UUID id;
    @Column(name = "position")
    private String position;
    @Column(name = "salaryRubInMonth")
    private Integer salaryRubInMonth;
    @Column(name = "user_id")
    private UUID userId;
    @Column(name = "is_approved")
    private Boolean isApproved;
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

    public ReviewSalaryEntity(String position, Integer salaryRubInMonth, UUID userId, CompanyEntity company) {
        this.position = position;
        this.salaryRubInMonth = salaryRubInMonth;
        this.userId = userId;
        this.company = company;
        this.isApproved =false;
        this.id=UUID.randomUUID();
    }

    public ReviewSalaryEntity(ImportCommonReviewDto feedBack) {
        this.position = feedBack.getPosition();
        this.salaryRubInMonth = feedBack.getSalaryRubInMonth();
        this.userId = UUID.fromString("94ee963b-8f4d-48ff-9b4f-feef753fd27f");
//        SecurityConfig.getCurrentUser();todo;
        this.company = new CompanyEntity(feedBack.getCompanyId());
        this.isApproved =false;
        this.id=UUID.randomUUID();
    }
}
