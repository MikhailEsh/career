package com.jraphql;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;

enum OrderByDirection implements CareerEnum {


    ASC("ASC", "升序"), DESC("DESC", "降序");

    public static final String ORDER_BY = "OrderBy";
    private CareerEnum.EnumInnerValue ev = null;

    OrderByDirection(String value, String name) {
        this.ev = new EnumInnerValue(value, name);
    }

    @Override
    public EnumInnerValue getEnumInnerValue() {
        return this.ev;
    }

}
