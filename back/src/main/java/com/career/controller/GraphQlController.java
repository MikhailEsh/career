package com.career.controller;

import com.jraphql.GraphQLExecutor;
import graphql.ExecutionResult;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import java.util.Map;

@RestController
public class GraphQlController implements ApplicationListener<ContextRefreshedEvent> {

    private GraphQLExecutor graphQLExecutor;

    @Autowired
    private EntityManager em;

    @PostConstruct
    public void PostCon() {
        graphQLExecutor = new GraphQLExecutor(em);
    }

    @RequestMapping(path = "/graphqlrest", method = RequestMethod.POST)
    ExecutionResult graphQl(@RequestBody final GraphQLInputQuery query) {

        Map<String, Object> variables = query.getVariables();
        //queryVariables != null ? objectMapper.readValue(query.getVariables(), Map.class) : null;

        return graphQLExecutor.execute(query.getQuery(), variables);
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        graphQLExecutor.onApplicationEvent(contextRefreshedEvent);
    }

    public static final class GraphQLInputQuery {
        @Getter
        String query;
        @Getter
        Map<String, Object> variables;
        @Getter
        String operationName;
    }

}