package com.jraphql.cn.zzk.validator.anntations;


import com.jraphql.cn.zzk.validator.core.DomainRuleValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;


/**
 *   * This annotation is intended to construct complex check statements for complex objects by replacing the @Valid annotation within the scope of the annotation (ie, method parameters and properties).
 *   * <p>
 *   * Complex check statements refer to grouping checks on object properties.
 *   * hibernate validator tends to construct a new Class to complete the grouping, which has the following drawbacks:
 *   * 1. The structure of the verification group is cumbersome
 *   * 2. Different request methods of the Controller layer have different verification requirements for the same object, which means that different check groups are constructed.
 *   * <p>
 *   * This annotation takes the form of constructing validate rules on demand in order to solve the above two problems - the construction of the validate rules is done by Value
 *  
 */
@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = DomainRuleValidator.class)
public @interface DomainRule {

    /**
     *       * Write a validate rule based on the property name. If "" then @DomainRule is equivalent to @Valid annotation
     *       * For example, the type to be verified:
     *       * <p>
     *       * User{
     *       *
     *       * @Length(min = 6, max = 24)
     *       * private String username;
     *       * @Email private String email;
     *       * @Length(min = 6, max = 24)
     *       * private String password;
     *       * <p>
     *       * }
     *       * </p>
     *       *
     *       * <p>
     *       * For example, the method to be verified:
     *       * void demo(@DomainRule(password && (email || username)) User user){}
     *       * <p>
     *       * This means first verifying the property in @DomainRule and then checking the logic
     *      
     */
    String value() default "";


    /**
     * Parameter verification failed information
     */
    String message() default "";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
