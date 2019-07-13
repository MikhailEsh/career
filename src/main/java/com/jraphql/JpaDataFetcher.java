package com.jraphql;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;
import graphql.language.*;
import graphql.schema.*;
import org.springframework.beans.ConfigurablePropertyAccessor;
import org.springframework.beans.PropertyAccessorFactory;

import javax.persistence.*;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.Attribute;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.PluralAttribute;
import javax.persistence.metamodel.SingularAttribute;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class JpaDataFetcher implements DataFetcher {

    protected EntityManager entityManager;
    protected EntityType<?> entityType;
    protected IGraphQlTypeMapper graphQlTypeMapper;


    public JpaDataFetcher(EntityManager entityManager, EntityType<?> entityType, IGraphQlTypeMapper graphQlTypeMapper) {
        this.entityManager = entityManager;
        this.entityType = entityType;
        this.graphQlTypeMapper = graphQlTypeMapper;
    }


    public final Object get(DataFetchingEnvironment environment) {
        QueryFilter queryFilter = extractQueryFilter(environment, environment.getFields().iterator().next());

        //TODO Check permissions
        //checkPermission();
        return this.getResult(environment, queryFilter);
    }


    protected QueryFilter extractQueryFilter(DataFetchingEnvironment environment, Field field) {
        return null;
    }

    public Object getResult(DataFetchingEnvironment environment, QueryFilter filter) {
        TypedQuery typedQuery = getQuery(environment, environment.getFields().iterator().next(), filter, QueryForWhatEnum.NORMAL, null);
        Object result = typedQuery.getResultList().stream().findFirst().orElse(null);
        return result;
    }

    /**
     * 遍历选中的字段集合，把entityGraph准备好
     *
     * @param cb
     * @param root
     * @param selectionSet
     * @param arguments
     * @param orders
     * @param entityGraph
     * @param subgraph
     * @param queryForWhat
     */
    private void travelFieldSelection(CriteriaBuilder cb, Path root, SelectionSet selectionSet, List<Argument> arguments, List<Order> orders, EntityGraph entityGraph, Subgraph subgraph, QueryForWhatEnum queryForWhat) {
        if (selectionSet != null) {
            selectionSet.getSelections().forEach(selection -> {
                if (selection instanceof Field) {
                    Field selectedField = (Field) selection;
                    String selectedFieldName = selectedField.getName();
                    // "__typename" is part of the graphql introspection spec and has to be ignored by jpa
                    if (!"__typename".equals(selectedFieldName) && !"parent".equals(selectedFieldName)) {
                        Path fieldPath = root.get(selectedField.getName());
                        // Process the orderBy clause
                        // TODO sort if there are some problems in the secondary layer, it seems impossible to affect, it seems to indicate the one2many under the collation of the entry, you will encounter problems, may be related to the entry in the form of set.many2one should not.

                        if (QueryForWhatEnum.JUSTFORCOUNTBYID != queryForWhat) {
                            Optional<Argument> orderByArgument = selectedField.getArguments().stream().filter(it -> OrderByDirection.ORDER_BY.equals(it.getName())).findFirst();
                            if (orderByArgument.isPresent()) {
                                if (OrderByDirection.DESC.getValue().equals(((EnumValue) orderByArgument.get().getValue()).getName())) {
                                    orders.add(cb.desc(fieldPath));
                                } else {
                                    orders.add(cb.asc(fieldPath));
                                }
                            }
                        }

                        // Process arguments clauses
                        arguments.addAll(selectedField.getArguments().stream()
                                .filter(it -> !OrderByDirection.ORDER_BY.equals(it.getName()))
                                .filter(it -> "id".equals(it.getName()) || "number".equals(it.getName()))
                                .map(it -> new Argument(selectedFieldName + "." + it.getName(), it.getValue()))
                                .collect(Collectors.toList()));

                        Path root2 = joinIfNecessary((From) root, selectedFieldName);
                        Subgraph subgraph2 = null;
                        if (root2 != root && QueryForWhatEnum.NORMAL == queryForWhat) {
                            if (entityGraph != null) {
                                subgraph2 = entityGraph.addSubgraph(selectedField.getName());
                            } else {
                                subgraph2 = subgraph.addSubgraph(selectedField.getName());
                            }
                        }

                        // If there is still the next layer, you need to recurse
                        if (((Field) selection).getSelectionSet() != null) {
                            travelFieldSelection(cb, root2, ((Field) selection).getSelectionSet(), arguments, orders, null, subgraph2, queryForWhat);
                        }
                    }
                }
            });
        }
    }

    /**
     * @param environment
     * @param field        -Select Content
     * @param queryFilter  - Filter conditions
     * @param queryforWhat - Whether to query only the number of eligible objects.If there is a collection of join, then discard no matter.
     * @param paginator    -When the justforselectcount is false, this paginator can be used as a paging, and similarly, paging invalidates the collection's join
     * @return
     */
    protected TypedQuery getQuery(DataFetchingEnvironment environment, Field field, QueryFilter queryFilter, QueryForWhatEnum queryforWhat, Paginator paginator) {


        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery query;
        if (QueryForWhatEnum.JUSTFORIDSINTHEPAGE == queryforWhat)
            query = (QueryForWhatEnum.JUSTFORCOUNTBYID == queryforWhat) ? cb.createQuery(Long.class) : cb.createQuery();
        else
            query = (QueryForWhatEnum.JUSTFORCOUNTBYID == queryforWhat) ? cb.createQuery(Long.class) : cb.createQuery((Class) entityType.getJavaType());

        Root root = query.from(entityType);

        SelectionSet selectionSet = field.getSelectionSet();
        List<Argument> arguments = new ArrayList<>();
        List<Order> orders = new ArrayList<>();
        EntityGraph graph = entityManager.createEntityGraph(entityType.getJavaType());
        List<Predicate> predicates = new ArrayList<>();

        // Loop through all of the fields being requested
        // The form of an iteration to compose a statement
        travelFieldSelection(cb, root, selectionSet, arguments, orders, graph, null, queryforWhat);

        Predicate predicatebyfilter = getPredicate(cb, root, environment, queryFilter);
        if (predicatebyfilter != null) {
            predicates.add(predicatebyfilter);
        }

        // Eventually all the non-orderby forms of argument into predicate, and into the where clause.
        arguments.addAll(field.getArguments());
        final Root roottemp = root;
        predicates.addAll(arguments.stream()
                .filter(it -> "id".equals(it.getName()))
                .map(it -> getPredicate(cb, roottemp, environment, it)).collect(Collectors.toList()));

        if (QueryForWhatEnum.JUSTFORCOUNTBYID == queryforWhat) {
            SingularAttribute idAttribute = entityType.getId(Object.class);
            query.select(cb.count(root.get(idAttribute.getName())));
        } else if (QueryForWhatEnum.JUSTFORIDSINTHEPAGE == queryforWhat) {
            SingularAttribute<?, ?> id = root.getModel().getId(root.getModel().getIdType().getJavaType());
            query.select(root.get(id).alias("id"));
        }
        query.where(predicates.toArray(new Predicate[predicates.size()]));
        if (QueryForWhatEnum.JUSTFORCOUNTBYID != queryforWhat) {
            query.orderBy(orders);
        }
        TypedQuery result = entityManager.createQuery(query);
        if (QueryForWhatEnum.NORMAL == queryforWhat && paginator != null) {
            result.setMaxResults(paginator.getSize());
            result.setFirstResult((paginator.getPage() - 1) * paginator.getSize());
        }

        return result.setHint("javax.persistence.fetchgraph", graph);
    }


    private void getPathlistForNestIds(String prefix, CriteriaQuery query, Set<String> result, Subgraph subgraph) {
        Optional.ofNullable(subgraph).ifPresent(sg -> sg.getAttributeNodes().stream().forEach(attributeNode -> {
            Map<Class, Subgraph> classSubgraphMap = ((AttributeNode) attributeNode).getSubgraphs();
            Optional.ofNullable(classSubgraphMap).ifPresent(csm -> csm.entrySet().stream().forEach(entry -> {
                EntityType type = graphQlTypeMapper.getEntityType(entry.getKey());
                if (type != null) {
                            String attrpath = prefix + "." + ((AttributeNode) attributeNode).getAttributeName();
                            result.add(attrpath + ".id");
                            getPathlistForNestIds(attrpath, query, result, entry.getValue());
                        }
                    })
            );
        }));
    }

    private Predicate getPredicate(CriteriaBuilder cb, Root root, DataFetchingEnvironment environment, QueryFilter queryFilter) {
        if (queryFilter == null) {
            return null;
        }

        Predicate result = null;
        String k = queryFilter.getKey();
        String[] parts = k.split("\\.");
        Path path = root;
        //TODO Here we have to report the error, because it is very likely that the data navigation is wrong.
        for (String part : parts) {
            if (part.equalsIgnoreCase("id")) {
                SingularAttribute<?, ?> id = root.getModel().getId(root.getModel().getIdType().getJavaType());
                part = id.getName();
            }

            // If the (From) path cannot be converted, then the k of the queryfilter is wrong.
            // Because if it contains, it must be a path like roleItems.role.id except the last paragraph is a relationship (can be used as)
            From temp = joinIfNecessary((From) path, part);
            if (temp == path) {// If there is no change, the description is up, the attribute is a simple type, get the path.
                path = temp.get(part);
            } else {
                path = temp;
            }
        }

        String v = queryFilter.getValue();
        QueryFilterOperator qfo = queryFilter.getOperator();
        QueryFilterCombinator qfc = queryFilter.getCombinator();
        Object value;

        //TODO Need to expand further
        switch (qfo) {

            case IN:
                List<Object> inList = Stream.of(v.split(",")).collect(Collectors.toList());
                for (int i = 0; i < inList.size(); i++) {
                    inList.set(i, convertFilterValue(path.getJavaType(), (String) inList.get(i)));
                }
                result = path.in(inList);
                break;
            case ISNULL:
                result = cb.isNull(path);
                break;
            case ISNOTNULL:
                result = cb.isNotNull(path);
                break;
            case LIKE:
                result = cb.like(cb.lower(path).as(String.class), v.toLowerCase());
                break;
            default:
                Class javaType = path.getJavaType();
                value = convertFilterValue(path.getJavaType(), v);

                switch (qfo) {
                    case EQUAL:
                        result = cb.equal(path, value);
                        break;
                    case NOTEQUAL:
                        result = cb.notEqual(path, value);
                        break;
                    case LESSTHAN:
                        if(javaType == BigDecimal.class){
                            result = cb.lessThan(path, (BigDecimal)value);
                        }else if(javaType == int.class || javaType == Integer.class){
                            result = cb.lessThan(path, (int)value);
                        }else if(javaType == long.class || javaType == Long.class){
                            result = cb.lessThan(path, (long)value);
                        }else if(javaType == Date.class){
                            result = cb.lessThan(path, (Date)value);
                        } else if (javaType == Timestamp.class) {
                            result = cb.lessThan(path, (Timestamp) value);
                        }else if( javaType == String.class){
                            result = cb.lessThan(path, (String)value);
                        } else {
                            throw new IllegalArgumentException("Operator 'LESSTHAN' applies to String, Number and Date");
                        }
                        break;
                    case GREATTHAN:
                        if(javaType == BigDecimal.class){
                            result = cb.greaterThan(path, (BigDecimal)value);
                        }else if(javaType == int.class || javaType == Integer.class){
                            result = cb.greaterThan(path, (int)value);
                        }else if(javaType == long.class || javaType == Long.class){
                            result = cb.greaterThan(path, (long)value);
                        }else if(javaType == Date.class){
                            result = cb.greaterThan(path, (Date)value);
                        } else if (javaType == Timestamp.class) {
                            result = cb.greaterThan(path, (Timestamp) value);
                        }else if( javaType == String.class){
                            result = cb.greaterThan(path, (String)value);
                        } else {
                            throw new IllegalArgumentException("Operator 'GREATTHAN' applies to String, Number and Date");
                        }
                        break;
                    case NOTLESSTHAN:
                        if(javaType == BigDecimal.class){
                            result = cb.greaterThanOrEqualTo(path, (BigDecimal)value);
                        }else if(javaType == int.class || javaType == Integer.class){
                            result = cb.greaterThanOrEqualTo(path, (int)value);
                        }else if(javaType == long.class || javaType == Long.class){
                            result = cb.greaterThanOrEqualTo(path, (long)value);
                        }else if(javaType == Date.class){
                            result = cb.greaterThanOrEqualTo(path, (Date)value);
                        } else if (javaType == Timestamp.class) {
                            result = cb.greaterThanOrEqualTo(path, (Timestamp) value);
                        }else if( javaType == String.class){
                            result = cb.greaterThanOrEqualTo(path, (String)value);
                        } else {
                            throw new IllegalArgumentException("Operator 'NOTLESSTHAN' applies to String, Number and Date");
                        }
                        break;
                    case NOTGREATTHAN:
                        if(javaType == BigDecimal.class){
                            result = cb.lessThanOrEqualTo(path, (BigDecimal)value);
                        }else if(javaType == int.class || javaType == Integer.class){
                            result = cb.lessThanOrEqualTo(path, (int)value);
                        }else if(javaType == long.class || javaType == Long.class){
                            result = cb.lessThanOrEqualTo(path, (long)value);
                        }else if(javaType == Date.class){
                            result = cb.lessThanOrEqualTo(path, (Date)value);
                        } else if (javaType == Timestamp.class) {
                            result = cb.lessThanOrEqualTo(path, (Timestamp) value);
                        }else if( javaType == String.class){
                            result = cb.lessThanOrEqualTo(path, (String)value);
                        } else {
                            throw new IllegalArgumentException("Operator 'NOTGREATTHAN' applies to String, Number and Date");
                        }
                        break;
                    case NOT:
                        result = cb.notEqual(path, value);
                        break;
                    default:
                        break;
                }
        }
        // If the operator does not, return directly
        if (qfc == null) {
            return result;
        }
        Predicate next = getPredicate(cb, root, environment, queryFilter.getNext());
        // If the next predicate itself is empty, it will return directly
        if (next == null) {
            return result;
        }

        switch (queryFilter.getCombinator()) {
            case AND:
                return cb.and(result, next);
            case OR:
                return cb.or(result, next);
            case NOT:
                return cb.and(result, cb.not(next));
            default:
                break;
        }
        return result;
    }

    private Object convertFilterValue(Class javaType, String v) {

        if(javaType == String.class){
            return v;
        }else if(javaType == BigDecimal.class){
            return BigDecimal.valueOf(Long.parseLong(v));
        }else if(javaType == boolean.class || javaType == Boolean.class){
            return Boolean.valueOf(v);
        }else if(javaType == int.class || javaType == Integer.class){
            return Integer.valueOf(v);
        }else if(javaType == long.class || javaType == Long.class){
            return Long.valueOf(v);
        }else if(javaType == Date.class){
            Long date = Long.parseLong(v);
            return new Date(date);
        } else if (javaType == Timestamp.class) {
            return new Timestamp(Long.parseLong(v));
        } else if (javaType == UUID.class) {
            return UUID.fromString(v.replaceAll("'", ""));
        } else if (CareerEnum.class.isAssignableFrom(javaType)) {
            return Arrays.stream((CareerEnum[]) javaType.getEnumConstants()).filter(bosEnum -> bosEnum.getValue().equals(v)).findFirst()
                    .orElse(null);
        }

        throw new IllegalArgumentException(String.format("No converter found for value: %s of type: %s", v, javaType));
    }

    /**
     * @param currentjoin   -当前join
     * @param attributeName - 当前join对应的实体类中的某属性名称
     * @return
     */
    private From joinIfNecessary(From currentjoin, String attributeName) {
        // Get the corresponding attribute value in the entity according to the attribute name.
        // Here, the error may be reported because the attribute does not exist. This indicates that the queryfilter expression is wrong.
        Attribute selectedFieldAttribute = JpaDataFetcher.this.entityManager.getMetamodel().entity(currentjoin.getJavaType()).getAttribute(attributeName);
        // If the property is one2many or many2one, check if you need to add a join in the current from
        // (if it exists before, it will not be added, otherwise it will be added)
        if ((selectedFieldAttribute instanceof PluralAttribute &&
                selectedFieldAttribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.ONE_TO_MANY)
                || (selectedFieldAttribute instanceof SingularAttribute
                && selectedFieldAttribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.MANY_TO_ONE)
                || (selectedFieldAttribute instanceof PluralAttribute
                && selectedFieldAttribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.MANY_TO_MANY)
                || (selectedFieldAttribute instanceof SingularAttribute
                && selectedFieldAttribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.ONE_TO_ONE)
        ) {
            // Add if it doesn't exist, and set the returned from to the new join
            Optional<Join> optjoin = currentjoin.getJoins().stream().filter(join -> attributeName.equals(((Join) join).getAttribute().getName())).findFirst();
            return optjoin.isPresent() ? optjoin.get() : currentjoin.join(attributeName, JoinType.LEFT);
        } else {// If it is a simple type, it means that you can't use the new join and return the old one.
            return currentjoin;
        }
    }

    /**
     * @param cb
     * @param root
     * @param environment
     * @param argument    -Generating an assertion for a field's filtering parameters
     * @return
     */
    private Predicate getPredicate(CriteriaBuilder cb, Root root, DataFetchingEnvironment environment, Argument argument) {
        Path path = null;
        if (!argument.getName().contains(".")) {
            Attribute argumentEntityAttribute = getAttribute(environment, argument);
            // Seems to be only used but the field does not have a point number, and does not have a relationship scalar = = type assertion,
            // so the join here is not meaningful, TODO always feel that this function is a bit of a problem.
            // If the argument is a list, let's assume we need to join and do an 'in' clause
            if (argumentEntityAttribute instanceof PluralAttribute) {
                Join join = root.join(argument.getName());
                return join.in(convertValue(environment, argument, argument.getValue()));
            }

            path = root.get(argument.getName());
            return cb.equal(path, convertValue(environment, argument, argument.getValue()));
        } else {
            String[] parts = argument.getName().split("\\.");
            for (String part : parts) {
                if (path == null) {
                    path = root.get(part);
                } else {
                    path = path.get(part);
                }
            }
            return cb.equal(path, convertValue(environment, argument, argument.getValue()));
        }
    }

    /**
     * * And enumeration types without care TODO
     *
     * @param environment
     * @param argument
     * @param value
     * @return
     */
    protected Object convertValue(DataFetchingEnvironment environment, Argument argument, Value value) {
        if (value instanceof StringValue) {
            Object convertedValue = environment.getArgument(argument.getName());
            if (convertedValue != null) {
                // Return real parameter for instance UUID even if the Value is a StringValue
                return convertedValue;
            } else {
                // Return provided StringValue
                return ((StringValue) value).getValue();
            }
        } else if (value instanceof VariableReference)
            return environment.getArguments().get(((VariableReference) value).getName());
        else if (value instanceof ArrayValue)
            return ((ArrayValue) value).getValues().stream().map((it) -> convertValue(environment, argument, it)).collect(Collectors.toList());
        else if (value instanceof EnumValue) {
            Class enumType = getJavaType(environment, argument);
            return Enum.valueOf(enumType, ((EnumValue) value).getName());
        } else if (value instanceof IntValue) {
            return ((IntValue) value).getValue();
        } else if (value instanceof BooleanValue) {
            return ((BooleanValue) value).isValue();
        } else if (value instanceof FloatValue) {
            return ((FloatValue) value).getValue();
        }

        return value.toString();
    }

    private Class getJavaType(DataFetchingEnvironment environment, Argument argument) {
        Attribute argumentEntityAttribute = getAttribute(environment, argument);

        if (argumentEntityAttribute instanceof PluralAttribute)
            return ((PluralAttribute) argumentEntityAttribute).getElementType().getJavaType();

        return argumentEntityAttribute.getJavaType();
    }

    private Attribute getAttribute(DataFetchingEnvironment environment, Argument argument) {
        GraphQLObjectType objectType = getObjectType(environment);
        EntityType type = getEntityType(objectType);
        return type.getAttribute(argument.getName());
    }


    private EntityType getEntityType(GraphQLObjectType objectType) {
        return entityManager.getMetamodel().getEntities().stream().filter(it -> it.getName().equals(objectType.getName())).findFirst().get();
    }

    private GraphQLObjectType getObjectType(DataFetchingEnvironment environment) {
        GraphQLType outputType = environment.getFieldType();
        if (outputType instanceof GraphQLList)
            outputType = ((GraphQLList) outputType).getWrappedType();

        if (outputType instanceof GraphQLObjectType)
            return (GraphQLObjectType) outputType;
        return null;
    }

    /**
     * @param environment
     * @param graphQLInputType
     * @param value
     * @return
     */
    protected Object convertValue(DataFetchingEnvironment environment, final GraphQLInputType graphQLInputType, Object value) {
        if (graphQLInputType instanceof GraphQLNonNull) {
            return convertValue(environment, (GraphQLInputType) (((GraphQLNonNull) graphQLInputType).getWrappedType()), value);
        } else if (value == null) {//Otherwise if it is empty
            return null;
        } else if (value instanceof VariableReference) {
            value = environment.getExecutionContext().getVariables().get(((VariableReference) value).getName());
            return convertValue(environment, graphQLInputType, value);
        } else if (graphQLInputType instanceof GraphQLInputObjectType) {//many2one
            Map map = (value instanceof Map) ? (Map) value : new HashMap();
            if (value instanceof ObjectValue) {//It is also possible that ObjectValue, the type of inline Argument (relative to external variable) is of this type.
                ((ObjectValue) value).getObjectFields().forEach(field -> map.put(field.getName(), field.getValue()));
            }
            map.keySet().stream().forEach(key -> {
                GraphQLInputType giotype = ((GraphQLInputObjectType) graphQLInputType).getField(key.toString()).getType();
                map.put(key, convertValue(environment, giotype, map.get(key)));
            });
            Object result = null;
            try {
                result = this.graphQlTypeMapper.getClazzByInputType(graphQLInputType).newInstance();
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("convertValue.error!");
            }
            ConfigurablePropertyAccessor wrapper = PropertyAccessorFactory.forDirectFieldAccess(result);
            wrapper.setPropertyValues(map);
            return result;
        } else if (graphQLInputType instanceof GraphQLList && (value instanceof Collection)) {//Many2one. graphql-java uses ArrayList in the middle and needs to be rotated again.
            Set set = new HashSet();
            ((Collection) value).stream().forEach(item -> {
                GraphQLInputType gitype = ((GraphQLInputType) ((GraphQLList) graphQLInputType).getWrappedType());
                set.add(convertValue(environment, gitype, item));
            });
            return set;
        } else if (graphQLInputType instanceof GraphQLEnumType) {//enum
            if (value instanceof CareerEnum) {
                return value;
            } else if (value instanceof EnumValue) {
                return this.graphQlTypeMapper.getBosEnumByValue((GraphQLEnumType) graphQLInputType, ((EnumValue) value).getName());
            } else {
                return this.graphQlTypeMapper.getBosEnumByValue((GraphQLEnumType) graphQLInputType, value.toString());
            }
        } else if (graphQLInputType instanceof GraphQLScalarType) {//scalar
            if (!(value instanceof Value)) {
                value = (value instanceof Integer) ? new IntValue(BigInteger.valueOf(((Integer) value).longValue())) :
                        (value instanceof BigInteger) ? new IntValue((BigInteger) value) :
                                (value instanceof Boolean) ? (new BooleanValue((Boolean) value)) :
                                        value instanceof String ? new StringValue((String) value) :
                                                value instanceof Float ? new FloatValue(BigDecimal.valueOf((Float) value)) :
                                                        value instanceof Double ? new FloatValue(BigDecimal.valueOf((Double) value)) :
                                                                value instanceof BigDecimal ? new FloatValue((BigDecimal) value) :
                                                                        value instanceof Long ? new IntValue(BigInteger.valueOf(((Long) value).longValue()))
                                                                                : null;
            }
            if (value != null) {
                return ((GraphQLScalarType) graphQLInputType).getCoercing().parseLiteral(value);
            }
        }
        throw new RuntimeException("convertValue scalar mismatch?" + graphQLInputType.getName() + ":" + value.getClass().getCanonicalName());
    }

    enum QueryForWhatEnum {
        JUSTFORCOUNTBYID,// just to count the number of records count (distinct (id))
        JUSTFORIDSINTHEPAGE,// just to find the ids recorded in a page
        NORMAL//General
    }
}
