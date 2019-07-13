package com.jraphql.cn.zzk.validator.anntations;

import java.lang.annotation.*;

/**
 * Combined logic check of request parameters
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ValidSelect {

    String value();

    String message() default "";

}