package com.career.entities;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Data
@Table(name = "review")
public class ReviewSalaryEntity {
    @Id
    @Column(name = "id")
    UUID id;
    @Column(name = "position")
    String position;
    @Column(name = "salaryrubinmonth")
    Integer salaryRubInMonth;
    @Column(name = "company")
    UUID company;
    @Column(name = "user")
    UUID User;
}
