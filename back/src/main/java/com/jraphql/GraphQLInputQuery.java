package com.jraphql;

import java.util.Map;

public final class GraphQLInputQuery {

    private String query;
    private Map<String, Object> arguments;

    public GraphQLInputQuery(String query, Map<String, Object> arguments) {
        this.query = query;
        this.arguments = arguments;
    }

    Map<String, Object> getArguments() {
        return arguments;
    }

    String getQuery() {
        return query;
    }
}