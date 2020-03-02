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
    @Column(name = "how_to_get_selection_responded_online_percent")
    private Long howToGetSelectionRespondedOnlinepercent;
    @Column(name = "how_to_get_selection_career_event_percent")
    private Long howToGetSelectionCareerEventPercent;
    @Column(name = "how_to_get_selection_invited_coworker_of_the_company_percent")
    private Long howToGetSelectionInvitedCoworkerOfTheCompanyPercent;
    @Column(name = "how_to_get_selection_through_the_agency_percent")
    private Long howToGetSelectionThroughTheAgencyPercent;
    @Column(name = "how_to_get_selection_other_percent")
    private Long howToGetSelectionOtherPercent;
    @Column(name = "useful_bad_percent")
    private Long usefulBadPercent;
    @Column(name = "useful_neutral_percent")
    private Long usefulNeutralPercent;
    @Column(name = "useful_good_percent")
    private Long usefulGoodPercent;


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
