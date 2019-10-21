package com.career.entities;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.GQLEntity;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Data
@Table(name = "review_salary")
public class ReviewSalaryEntity implements GQLEntity {
    @Id
    @Column(name = "id")
    private UUID id;
    @Column(name = "position")
    private String position;
    @Column(name = "salaryrubinmonth")
    private Integer salaryRubInMonth;
    @Column(name = "company_id")
    private UUID companyId;
    @Column(name = "user_id")
    private UUID userId;

    @Override
    public UUID getId() {
        return id;
    }
}
