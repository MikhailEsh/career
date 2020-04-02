package com.career.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SalaryDto {
    private String position;
    private Integer avrSalary;
    private Integer minSalary;
    private Integer maxSalary;

    public SalaryDto(String position, Integer min, Integer avr, Integer max) {
        this.position = position;
        this.maxSalary = max;
        this.minSalary = min;
        this.avrSalary = avr;
    }
}
