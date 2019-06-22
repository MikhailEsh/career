package com.career.utils.defaultparameters;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface DefaultBoolean {
    boolean value() default false;
}
