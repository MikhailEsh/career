package com.career.dto.enumDto;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;

public enum DateWorkEnum implements CareerEnum {

    LESS_1_YEAR("LESS_1_YEAR","Less1Year"),
    BETWEEN_1_2_YEAR("BETWEEN_1_2_YEAR","Between2to3Year"),
    BETWEEN_3_4_YEAR("BETWEEN_3_4_YEAR","Between3to4Year"),
    BETWEEN_5_7_YEAR("BETWEEN_5_7_YEAR","Between5to7Year"),
    BETWEEN_8_10_YEAR("BETWEEN_8_10_YEAR","Between8to10Year"),
    MORE_10_YEAR("MORE_10_YEAR","More10Year"),
    FINISH_2013("FINISH_2013","Finish2013"),
    FINISH_2014("FINISH_2014","Finish2014"),
    FINISH_2015("FINISH_2015","Finish2015"),
    FINISH_2016("FINISH_2016","Finish2016"),
    FINISH_2017("FINISH_2017","Finish2017"),
    FINISH_2018("FINISH_2018","Finish2018"),
    FINISH_2019("FINISH_2019","Finish2019");
    private CareerEnum.EnumInnerValue ev;

    DateWorkEnum(String value, String name) {
        this.ev = new CareerEnum.EnumInnerValue(value, name);
    }

    @Override
    public EnumInnerValue getEnumInnerValue() {
        return this.ev;
    }
}
