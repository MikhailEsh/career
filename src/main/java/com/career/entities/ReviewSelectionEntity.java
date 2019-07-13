package com.career.entities;

import com.career.dto.enumDto.HowToGetIntervew;
import com.career.dto.enumDto.RecommendEnum;
import com.career.dto.enumDto.TimeTakenEnum;
import com.career.dto.enumDto.TypeOfInterviewOrTestEnum;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "review_selection")
public class ReviewSelectionEntity {
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
    private Date dateInterview;
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
    @Column(name = "company")
    private UUID company;
    @Column(name = "user")
    private UUID User;
    @Column(name = "overview")
    private String overview;
    @Column(name = "time_taken")
    private TimeTakenEnum timeTaken;
}
