package com.jraphql;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;

@SchemaDocumentation("Query filter operations types")
enum QueryFilterOperator implements CareerEnum {
    ISNULL("ISNULL", "is null"),
    ISNOTNULL("ISNOTNULL", "is not null"),
    GREATTHAN("greaterThan", "greater than"),
    LESSTHAN("lessThan", "less than"),
    NOTLESSTHAN("NOTLESSTHAN", "not less than"),
    NOTGREATTHAN("NOTGREATTHAN", "not great than"),
    NOTEQUAL("notEqual", "not equal"),
    EQUAL("equals", "equals"),
    IN("IN", "in"),
    NOTIN("NOTIN", "not in"),
    NOT("NOT", "not"),
    LIKE("LIKE", "like");

    private CareerEnum.EnumInnerValue ev = null;

    QueryFilterOperator(String value, String name) {
        this.ev = new CareerEnum.EnumInnerValue(value, name);
    }

    @Override
    public EnumInnerValue getEnumInnerValue() {
        return this.ev;
    }
}

//TODO May need to be extended or more normalized

@SchemaDocumentation("Query expression composition operator")
enum QueryFilterCombinator implements CareerEnum {
    AND("AND", "and"),
    OR("OR", "or"),
    NOT("NOT", "!");

    private CareerEnum.EnumInnerValue ev = null;

    QueryFilterCombinator(String value, String name) {
        this.ev = new CareerEnum.EnumInnerValue(value, name);
    }

    @Override
    public CareerEnum.EnumInnerValue getEnumInnerValue() {
        return this.ev;
    }
}

@SchemaDocumentation("Filter conditions")
public class QueryFilter {

    /**
     * Refers to the relationship with the previous one, similar to the(（last) combinator this)
     */
    private QueryFilterCombinator combinator;

    @SchemaDocumentation("Keys that can be navigated with.No.")
    public void setKey(String key) {
        this.key = key;
    }

    @SchemaDocumentation("Value, which can be%abc corresponding to like")
    public void setValue(String value) {
        this.value = value;
    }

    @SchemaDocumentation("Operator")
    public void setOperator(QueryFilterOperator operator) {
        this.operator = operator;
    }

    @SchemaDocumentation("Conditional combination symbols")
    public void setCombinator(QueryFilterCombinator combinator) {
        this.combinator = combinator;
    }

    @SchemaDocumentation("Next condition")
    public void setNext(QueryFilter next) {
        this.next = next;
    }

    private String key;

    private String value;

    private QueryFilterOperator operator;

    private QueryFilter next;

    public QueryFilter() {

    }
    public QueryFilter(String key, QueryFilterOperator operator, String value, QueryFilterCombinator combinator, QueryFilter next) {
        this.key = key;
        this.value = value;
        this.operator = operator;
        this.combinator = combinator;
        this.next = next;
    }


    public String getKey() {
        return key;
    }

    public String getValue() {
        return value;
    }

    public QueryFilterOperator getOperator() {
        return operator;
    }

    public QueryFilterCombinator getCombinator() {
        return combinator;
    }

    public QueryFilter getNext() {
        return next;
    }

    public boolean isDisabledEntityAllowed() {
        return CollectionJpaDataFetcher.ENTITY_PROP_FOR_DISABLED.equals(this.getKey())
                && QueryFilterCombinator.OR.equals(this.getCombinator())
                && Boolean.valueOf(this.getValue()).booleanValue();
    }

    public boolean isOnlyDisabledEntityAllowed() {
        return CollectionJpaDataFetcher.ENTITY_PROP_FOR_DISABLED.equals(this.getKey())
                && QueryFilterCombinator.AND.equals(this.getCombinator())
                && Boolean.valueOf(this.getValue()).booleanValue();
    }

}
