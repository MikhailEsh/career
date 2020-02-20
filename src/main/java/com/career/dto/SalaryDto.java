package com.career.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SalaryDto {
    private String position;
    private Integer salary;

            public SalaryDto(String position,Integer salary){
                this.position=position;
                this.salary=salary;
            }
}
