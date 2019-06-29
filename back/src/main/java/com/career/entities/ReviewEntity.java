package com.career.entities;

import com.career.dto.enumDto.RecommendEnum;
import com.career.dto.enumDto.StatusEmployeeEnum;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "review")
public class ReviewEntity {
    @Id
    @Column(name = "id")
    UUID id;
    @Column(name = "name")
    String name;
    @Column(name = "salary_scale")
    Integer ZP;
    @Column(name = "leadership_scale")
    Integer leadership;
    @Column(name = "culture_scale")
    Integer culture;
    @Column(name = "career_scale")
    Integer career;
    @Column(name = "balance_scale")
    Integer balanceWorkHome;
    @Column(name = "recomend")
    RecommendEnum recommend;
    @Column(name = "plus")
    String plus;
    @Column(name = "minuses")
    String minuses;
    @Column(name = "date")
    Date date;
    @Column(name = "status")
    StatusEmployeeEnum status;
    @Column(name = "position")
    String position;
    @Column(name = "useful")
    Integer useful;
    @Column(name = "user")
    UUID user;
    @Column(name = "approve")
    Boolean approved;
    @Column(name = "company")
    UUID company;
}
