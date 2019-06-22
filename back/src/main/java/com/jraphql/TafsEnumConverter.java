package com.jraphql;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.TafsEnum;

import javax.persistence.AttributeConverter;
import java.lang.reflect.ParameterizedType;
import java.util.Arrays;

public abstract class TafsEnumConverter<T extends TafsEnum> implements AttributeConverter<T, String> {
    private Class<T> type;

    public TafsEnumConverter() {
        this.type = (Class<T>) ((ParameterizedType) getClass()
                .getGenericSuperclass()).getActualTypeArguments()[0];
    }


    @Override
    public String convertToDatabaseColumn(T attribute) {
        return attribute.getValue();
    }

    @Override
    public T convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        } else {
            return Arrays.stream(((Class<TafsEnum>) type).getEnumConstants()).filter(
                    enumValue -> enumValue.getValue().equals(dbData))
                    .map(enumValue -> ((T) enumValue))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("enum convertError!" + dbData + ":" + type.getClass().getCanonicalName()));
        }
    }
}


