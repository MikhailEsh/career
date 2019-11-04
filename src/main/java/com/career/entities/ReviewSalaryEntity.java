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
import java.util.UUID;

@Entity
@Data
@Table(name = "review_salary")
public class ReviewSalaryEntity implements GQLEntity {
    @Id
    @Column(name = "id")
    private UUID id;
    @Column(name = "position")
    private String position;
    @Column(name = "salaryrubinmonth")
    private Integer salaryRubInMonth;
    @Column(name = "user_id")
    private UUID userId;

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
