package com.career.dto.enumDto;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;

public enum TypeOfInterviewOrTestEnum implements CareerEnum {

    SKYPE("SKYPE", "Skype"),
    OFFLINE("OFFLINE", "Offline"),
    PROGRAM("PROGRAM", "Program"),
    GROUP("GROUP", "Group"),

    SKILLS("SKILLS", "Skills"),
    PSYCHOLOGICAL("PSYCHOLOGICAL", "Psychological"),
    ENGLISH("ENGLISH", "English"),
    TECH_TASK("TECH_TASK", "Tech_task"),
    MATH("MATH", "Math"),
    SECURITY("SECURITY", "Security"),
    HOME_WORK("HOME_WORK", "Home_Work");

    private CareerEnum.EnumInnerValue ev;

    TypeOfInterviewOrTestEnum(String value, String name) {
        this.ev = new CareerEnum.EnumInnerValue(value, name);
    }

    @Override
    public CareerEnum.EnumInnerValue getEnumInnerValue() {
        return this.ev;
    }
}
