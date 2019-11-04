package com.career.entities;

import com.career.dto.enumDto.HowToGetIntervew;
import com.career.dto.enumDto.RecommendEnum;
import com.career.dto.enumDto.TimeTakenEnum;
import com.career.dto.enumDto.TypeOfInterviewOrTestEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jraphql.cn.wzvtcsoft.x.bos.domain.GQLEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyToOne;
import org.hibernate.annotations.LazyToOneOption;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@Table(name = "review_selection")
public class ReviewSelectionEntity implements GQLEntity {
    @Id
    @Column(name = "id")
    private UUID id;
    @Column(name = "select_in")
    private Boolean selectIn;
    @Column(name = "positive_experience")
    private RecommendEnum positiveExperience;
    @Column(name = "selection_process")
    private Integer selectionProcess;
    @Column(name = "how_get_interview")
    private HowToGetIntervew howGetInterview;
    @Column(name = "date_interview")
    private LocalDate dateInterview;
    @Column(name = "question")
    private String questions;
    @Column(name = "type_interview")
    private TypeOfInterviewOrTestEnum typeOfInterview;
    @Column(name = "tests")
    private TypeOfInterviewOrTestEnum tests;
    @Column(name = "difficult")
    private Integer difficult;
    @Column(name = "useful")
    private Integer useful;
    @Column(name = "user_id")
    private UUID userId;
    @Column(name = "overview")
    private String overview;
    @Column(name = "time_taken")
    private TimeTakenEnum timeTaken;

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
