package com.career.dto.enumDto;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;

public enum  RecommendEnum implements   CareerEnum{

    RECOMMEND("RECOMMEND","Recommend"),
    NEUTRAL("NEUTRAL","neutral"),
    UNRECOMMEND("UNRECOMMEND","Unrecommend");
    private CareerEnum.EnumInnerValue ev;

    RecommendEnum(String value, String name) {
        this.ev = new CareerEnum.EnumInnerValue(value, name);
    }

    @Override
    public EnumInnerValue getEnumInnerValue() {
        return this.ev;
    }
}






