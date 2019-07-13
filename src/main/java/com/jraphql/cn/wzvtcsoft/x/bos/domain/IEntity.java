package com.jraphql.cn.wzvtcsoft.x.bos.domain;


/**
 * Created by liutim on 2017/11/25.
 */
public interface IEntity extends GQLEntity {

    String getCreateactorid();

    String getUpdateactorid();

    long getCreatetime();

    long getUpdatetime();
}

