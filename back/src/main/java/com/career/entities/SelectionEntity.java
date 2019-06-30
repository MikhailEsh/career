package com.career.entities;

import com.career.dto.enumDto.RecommendEnum;
import com.career.dto.enumDto.TestsEnum;
import com.career.dto.enumDto.TypeOfInterviewEnum;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;
import java.util.UUID;

@Entity
@Data
@Table(name="review_selection")
public class SelectionEntity {
    @Id
    @Column(name = "id")
    UUID id;
    @Column(name = "select_in")
    Boolean selectIn;
    @Column(name = "positive_experience")
    RecommendEnum positiveExperience;
    @Column(name = "selection_process")
    Integer selectionProcess;
    @Column(name = "how_get_interview")
    String howGetInterview;
    @Column(name = "date_interview")
    Date dateInterview;
    @Column(name = "question")
    String questions;
    @Column(name = "type_interview")
    TypeOfInterviewEnum typeOfInterview;
    @Column(name = "tests")
    TestsEnum tests;
    @Column(name = "difficult")
    Integer difficult;
    @Column(name = "useful")
    Integer useful;
    @Column(name = "company")
    UUID company;
    @Column(name = "user")
    UUID User;
}
