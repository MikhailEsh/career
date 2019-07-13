package com.career.utils.defaultparameters;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface DefaultTimestamp {
    long value() default 0L;
}
