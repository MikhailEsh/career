package com.career.dto.enumDto;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;

public enum HowToGetIntervew implements CareerEnum {

    RESPONDED_ONLINE("RESPONDED_ONLINE","Responded_online"),
    СAREER_EVENT("СAREER_EVENT","Сareer_event"),
    INVITED_COWORKER_OF_THE_COMPANY("INVITED_COWORKER_OF_THE_COMPANY","Шnvited_coworker_of_the_company"),
    THROUGH_THE_AGENCY("THROUGH_THE_AGENCY","Through_the_agency"),
    OTHER("OTHER","OTHER");
    private CareerEnum.EnumInnerValue ev;

    HowToGetIntervew(String value, String name) {
        this.ev = new CareerEnum.EnumInnerValue(value, name);
    }

    @Override
    public EnumInnerValue getEnumInnerValue() {
        return this.ev;
    }
}
