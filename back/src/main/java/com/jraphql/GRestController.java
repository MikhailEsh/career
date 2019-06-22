package com.jraphql;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
/**
 * 为了让原本的Controller中的RestController能方便的切换到GraphQL mutation，互相切换
 */
public @interface GRestController {

    /**
     * The value may indicate a suggestion for a logical component name,
     * to be turned into a Spring bean in case of an autodetected component.
     * @return the suggested component name, if any
     * @since 4.0.1
     */
    String value() default "";

}

