package com.career.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImportSelectionReviewDto {
    private UUID companyId;
    private String companyName;
    private String jobTitle;
    private Boolean selectIn;
    private String feedbackGrade;
    private String howGetInterview;
    private LocalDate dateInterview;
    private String[] typeOfInterview;
    private Integer difficult;
    private String overview;
    private String timeTaken;

}