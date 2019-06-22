package com.career.dto.enumDto;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;

public enum TestsEnum implements CareerEnum{

    SKYPE("SKYPE","Skype"),
    OFFLINE("OFFLINE","Offline");
    private CareerEnum.EnumInnerValue ev;

    TestsEnum(String value, String name) {
        this.ev = new CareerEnum.EnumInnerValue(value, name);
    }

    @Override
    public CareerEnum.EnumInnerValue getEnumInnerValue() {
        return this.ev;
    }
}
