package com.career.controller.authentication;


import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
@Component
public class RestAccessDeniedHandler implements AccessDeniedHandler {
    @ExceptionHandler(value = Exception.class)
    @Override
    public void handle(HttpServletRequest httpServletRequest,
                       HttpServletResponse httpServletResponse,
                       AccessDeniedException e) throws IOException {


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
//            log.info("User '" + auth.getName() + "' attempted to access the protected URL: " + httpServletRequest.getRequestURI());

        }

        httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden");
    }
}