package com.jraphql.cn.wzvtcsoft.x.bos.domain;

// Generated file. Do not edit.
// Generated by org.xdoclet.plugin.timbos.ActionScript3Plugin from BosEntity

import com.jraphql.SchemaDocumentation;
import com.jraphql.cn.wzvtcsoft.x.bos.domain.persist.CoreObject;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Access(AccessType.FIELD)
public abstract class BosEntity extends CoreObject implements IEntity {

    @Column(name = "number", unique = true, nullable = false, length = 25)
    private String number;

    @SchemaDocumentation("创建人ID")
    @CreatedBy
    @Column(name = "createactorid", length = 25)
    private String createactorid;

    @SchemaDocumentation("上次修改人ID")
    @LastModifiedBy
    @Column(name = "updateactorid", length = 25)
    private String updateactorid;

    @SchemaDocumentation("上次修改时间，以毫秒为单位")
    @LastModifiedDate
    private long updatetime;
    @SchemaDocumentation("创建时间，以毫秒为单位")
    @CreatedDate
    private long createtime;

    //TODO 怎么设置普遍的查询时过滤掉禁用的？
    @SchemaDocumentation("是否禁用，主要是用来做假删除")
    private boolean disabled = false;
    //TODO 乐观锁控制

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }


    public String getCreateactorid() {
        return createactorid;
    }

    public void setCreateactorid(String createactorid) {
        this.createactorid = createactorid;
    }

    public String getUpdateactorid() {
        return updateactorid;
    }

    public long getUpdatetime() {
        return updatetime;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    /*   public void setUpdatetime(long updatetime) {
           this.updatetime = updatetime;
       }*/
    public long getCreatetime() {
        return createtime;
    }

    public void setCreatetime(long createtime) {
        this.createtime = createtime;
    }
/*
    public void setCreatetime(long createtime) {
        this.createtime = createtime;
    }
*/


}
