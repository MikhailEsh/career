package com.career.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jraphql.cn.wzvtcsoft.x.bos.domain.GQLEntity;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyToOne;
import org.hibernate.annotations.LazyToOneOption;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "company")
public class CompanyEntity implements GQLEntity {
    @Id
    @Column(name = "id")
    private UUID id;
    @Column(name = "name")
    private String name;
    @Column(name = "count_company_review")
    private Integer countCompanyReview;
    @Column(name = "count_salary_review")
    private Integer countSalaryReview;
    @Column(name = "count_selection_review")
    private Integer countSelectionReview;
    @Column(name = "time_added")
    private LocalDateTime timeAdded;

    @Override
    public UUID getId() {
        return id;
    }

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @LazyToOne(LazyToOneOption.NO_PROXY)
    @EqualsAndHashCode.Exclude
    @Fetch(FetchMode.JOIN)
    private Set<ReviewCompanyEntity> reviewCompanyEntities=new HashSet<ReviewCompanyEntity>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @LazyToOne(LazyToOneOption.NO_PROXY)
    @EqualsAndHashCode.Exclude
    @Fetch(FetchMode.JOIN)

    private Set<ReviewSalaryEntity> reviewSalaryEntities=new HashSet<ReviewSalaryEntity>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @LazyToOne(LazyToOneOption.NO_PROXY)
    @EqualsAndHashCode.Exclude
    @Fetch(FetchMode.JOIN)
    private Set<ReviewSelectionEntity> reviewSelectionEntities=new HashSet<ReviewSelectionEntity>();

}
