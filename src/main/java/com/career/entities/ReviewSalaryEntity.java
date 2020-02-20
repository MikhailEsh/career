package com.career.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jraphql.cn.wzvtcsoft.x.bos.domain.GQLEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyToOne;
import org.hibernate.annotations.LazyToOneOption;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "review_salary")
public class ReviewSalaryEntity implements Serializable,GQLEntity {
    @Id
    @Column(name = "id")
    private UUID id;
    @Column(name = "position")
    private String position;
    @Column(name = "salaryrubinmonth")
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
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.DETACH)
    @JoinColumn(name="company_id", referencedColumnName = "id"
            , insertable = false, updatable = false)
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
}
