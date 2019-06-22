package com.jraphql.cn.wzvtcsoft.x.bos.domain;


import com.jraphql.cn.wzvtcsoft.x.bos.domain.persist.CoreObject;
import com.jraphql.cn.wzvtcsoft.x.bos.domain.persist.EntryParentType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

/**
 * Created by liutim on 2017/11/25.
 */


@MappedSuperclass
@Access(AccessType.FIELD)
@TypeDef(name = "EntryParentType", typeClass = EntryParentType.class)
public abstract class Entry extends CoreObject implements IEntry {


    @Column(name = "parent_id", length = 25)
    @Type(type = "EntryParentType")
    private GQLEntity parent;

    /*final protected GQLEntity getParent() {
        return parent;
    }*/
}
