package com.career.entities;

import com.career.dto.enumDto.HowToGetIntervew;
import com.career.dto.enumDto.RecommendEnum;
import com.career.dto.enumDto.TimeTakenEnum;
import com.career.dto.enumDto.TypeOfInterviewOrTestEnum;
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
    @Column(name = "review_title")
    private String reviewTitle;
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

    public ReviewSelectionEntity(Boolean selectIn,
                                 RecommendEnum positiveExperience,
                                 Integer selectionProcess,
                                 HowToGetIntervew howGetInterview,
                                 LocalDate dateInterview,
                                 String questions,
                                 TypeOfInterviewOrTestEnum typeOfInterview,
                                 TypeOfInterviewOrTestEnum tests,
                                 Integer difficult,
                                 Integer useful,
                                 UUID userId,
                                 String overview,
                                 TimeTakenEnum timeTaken,
                                 String reviewTitle,
                                 CompanyEntity company) {
       this.id=UUID.randomUUID();
        this.selectIn = selectIn;
        this.positiveExperience = positiveExperience;
        this.selectionProcess = selectionProcess;
        this.howGetInterview = howGetInterview;
        this.dateInterview = dateInterview;
        this.questions = questions;
        this.typeOfInterview = typeOfInterview;
        this.tests = tests;
        this.difficult = difficult;
        this.useful = useful;
        this.userId = userId;
        this.overview = overview;
        this.timeTaken = timeTaken;
        this.reviewTitle = reviewTitle;
        this.company = company;
        this.isApproved =false;
        this.id=UUID.randomUUID();
    }
}
