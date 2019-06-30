package com.career.dto.enumDto;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;

public enum TimeTakenEnum  implements CareerEnum {

    WEEK("WEEK","Week"),
    FEW_WEEK("FEW_WEEK","Few_Week"),
    MONTH("MONTH","Month"),
    MONTH_2("MONTH_2","2_Month"),
    MONTH_3_6("MONTH_3_6","3_to_6_Month"),
    MORE_6_MONTH("MORE_6_MONTH","More_6_Month");
    private CareerEnum.EnumInnerValue ev;

    TimeTakenEnum(String value, String name) {
        this.ev = new CareerEnum.EnumInnerValue(value, name);
    }

    @Override
    public CareerEnum.EnumInnerValue getEnumInnerValue() {
        return this.ev;
    }
}
