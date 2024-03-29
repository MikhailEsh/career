package com.jraphql;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;

import javax.persistence.Converter;

@SchemaDocumentation("测试是否为空")
public enum FieldNullEnum implements CareerEnum {

    ISNULL("ISNULL", "为空"), NOTNULL("NOTNULL", "不为空");

    FieldNullEnum(String value, String name) {
        this.ev = new CareerEnum.EnumInnerValue(value, name);
    }

    private EnumInnerValue ev = null;

    @Override
    public EnumInnerValue getEnumInnerValue() {
        return this.ev;
    }

    @Converter(autoApply = true)
    public static class FieldNullEnumConverter extends TafsEnumConverter<FieldNullEnum> {
    }
}


