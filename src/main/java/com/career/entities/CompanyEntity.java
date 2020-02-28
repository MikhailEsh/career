package com.career.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jraphql.cn.wzvtcsoft.x.bos.domain.GQLEntity;
import lombok.*;

import javax.persistence.*;
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
    @Column(name = "average_common_scale")
    private Double averageCommonScale;
    @Column(name = "average_salary_scale")
    private Double averageSalaryScale;
    @Column(name = "average_leadership_scale")
    private Double averageLeadershipScale;
    @Column(name = "average_culture_scale")
    private Double averageCultureScale;
    @Column(name = "average_career_scale")
    private Double averageCareerScale;
    @Column(name = "average_balance_scale")
    private Double averageBalanceScale;
    @Column(name = "average_selection_difficult_scale")
    private Double averageSelectionDifficultScale;
    @Column(name = "how_to_get_selection_0_count")
    private Long howToGetSelection0Count;
    @Column(name = "how_to_get_selection_1_count")
    private Long howToGetSelection1Count;
    @Column(name = "how_to_get_selection_2_count")
    private Long howToGetSelection2Count;
    @Column(name = "how_to_get_selection_3_count")
    private Long howToGetSelection3Count;
    @Column(name = "how_to_get_selection_4_count")
    private Long howToGetSelection4Count;
    @Column(name = "useful_0_count")
    private Long useful0Count;
    @Column(name = "useful_1_count")
    private Long useful1Count;
    @Column(name = "useful_2_count")
    private Long useful2Count;


    @Override
    public UUID getId() {
        return id;
    }

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    private Set<ReviewCompanyEntity> reviewCompanyEntities = new HashSet<ReviewCompanyEntity>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    private Set<ReviewSalaryEntity> reviewSalaryEntities = new HashSet<ReviewSalaryEntity>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    private Set<ReviewSelectionEntity> reviewSelectionEntities = new HashSet<ReviewSelectionEntity>();

    public CompanyEntity(UUID id) {
        this.id = id;
    }
}
