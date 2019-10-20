package com.career.dto.enumDto;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;

public enum StatusEmployeeEnum implements CareerEnum{

    WORK_NOW("WORK_NOW","WorkNow"),
    WORKED("WORKED","Worked"),
    UNKNOWN("UNKNOWN","Unknown");
    private CareerEnum.EnumInnerValue ev;

    StatusEmployeeEnum(String value, String name) {
        this.ev = new CareerEnum.EnumInnerValue(value, name);
    }

    @Override
    public CareerEnum.EnumInnerValue getEnumInnerValue() {
        return this.ev;
    }
}
