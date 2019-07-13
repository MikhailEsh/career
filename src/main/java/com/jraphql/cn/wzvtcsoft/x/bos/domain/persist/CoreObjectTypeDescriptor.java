package com.jraphql.cn.wzvtcsoft.x.bos.domain.persist;

import org.hibernate.type.descriptor.WrapperOptions;
import org.hibernate.type.descriptor.java.AbstractTypeDescriptor;

import java.lang.reflect.Field;

class CoreObjectTypeDescriptor extends AbstractTypeDescriptor<CoreObject> {

    public static final CoreObjectTypeDescriptor INSTANCE = new CoreObjectTypeDescriptor();
    private static final String DELIMITER = ",";

    public CoreObjectTypeDescriptor() {
        super(CoreObject.class);
    }

    @Override
    public String toString(CoreObject value) {
        return value.getId().toString();
    }

    @Override
    public CoreObject fromString(String string) {
        if (string == null || string.isEmpty()) {
            return null;
        }
        CoreObject o = new CoreObject();
        try {
            Field field = o.getClass().getDeclaredField("id");
            field.setAccessible(true);
            field.set(o, string);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        }
        return o;
    }

    @SuppressWarnings({"unchecked"})
    public <X> X unwrap(CoreObject value, Class<X> type, WrapperOptions options) {
        if (value == null) {
            return null;
        }
        if (CoreObject.class.isAssignableFrom(type)) {
            return (X) value;
        }
        if (String.class.isAssignableFrom(type)) {
            return (X) toString(value);
        }
        throw unknownUnwrap(type);
    }

    public <X> CoreObject wrap(X value, WrapperOptions options) {
        if (value == null) {
            return null;
        }
        if (value instanceof String) {
            return fromString((String) value);
        }
        if (value instanceof CoreObject) {
            return (CoreObject) value;
        }
        throw unknownWrap(value.getClass());
    }
}