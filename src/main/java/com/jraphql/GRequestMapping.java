package com.jraphql;

import org.springframework.core.annotation.AliasFor;
import org.springframework.web.bind.annotation.RequestMethod;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
/**
 * 为了让原本的Controller中的requestMapping能方便的切换到GraphQL mutation，互相切换
 */
public @interface GRequestMapping {

    String name() default "";

    @AliasFor("path")
    String[] value() default {};

    @AliasFor("value")
    String[] path() default {};

    String[] headers() default {};

    String[] params() default {};

    String[] consumes() default {};

    String[] produces() default {};

    RequestMethod[] method() default {};
}
