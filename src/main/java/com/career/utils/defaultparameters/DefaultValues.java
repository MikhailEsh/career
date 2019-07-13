package com.career.utils.defaultparameters;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

public class DefaultValues {

    public static void setDefaults(Object object) {
        for (Field f : object.getClass().getDeclaredFields()) {
            f.setAccessible(true);
            try {
                if (f.get(object) == null) {
                    f.set(object, getDefaultValueFromAnnotation(f.getAnnotations()));
                }
            } catch (IllegalAccessException e) { // shouldn't happen because, used setAccessible
            }
        }
        for (Field f : object.getClass().getSuperclass().getDeclaredFields()) {
            f.setAccessible(true);
            try {
                if (f.get(object) == null) {
                    f.set(object, getDefaultValueFromAnnotation(f.getAnnotations()));
                }
            } catch (IllegalAccessException e) { // shouldn't happen because, used setAccessible
            }
        }
    }

    private static Object getDefaultValueFromAnnotation(Annotation[] annotations) {
        for (Annotation a : annotations) {
            if (a instanceof DefaultString)
                return ((DefaultString) a).value();
            if (a instanceof DefaultInteger)
                return ((DefaultInteger) a).value();
            if (a instanceof DefaultLong)
                return ((DefaultLong) a).value();
            if (a instanceof DefaultBoolean)
                return ((DefaultBoolean) a).value();
            if (a instanceof DefaultTimestamp)
                return new Timestamp(((DefaultTimestamp) a).value());
            if (a instanceof DefaultDate)
                return new Date(((DefaultDate) a).value());
            if (a instanceof DefaultBigDecimal)
                return new BigDecimal(((DefaultBigDecimal) a).value());
        }
        return null;
    }
}
