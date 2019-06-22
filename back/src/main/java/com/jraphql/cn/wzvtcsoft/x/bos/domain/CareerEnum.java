package com.jraphql.cn.wzvtcsoft.x.bos.domain;

public interface CareerEnum {
    CareerEnum.EnumInnerValue getEnumInnerValue();

    @Deprecated
    default String getDescription() {
        return getEnumInnerValue().getDescription();
    }

    default String getValue() {
        return getEnumInnerValue().getValue();
    }

    default String getAlias() {
        return getEnumInnerValue().getName();
    }

    class EnumInnerValue {
        private String value;
        private String alias;
        private String description;

        public EnumInnerValue(String value, String alias) {
            this.value = value;
            this.alias = alias;
            this.description = "";
        }

        private String getValue() {
            return value;
        }

        public String getName() {
            return alias;
        }

        public String getDescription() {
            return description;
        }
    }
}
