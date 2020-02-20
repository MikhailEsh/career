package com.jraphql;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.CareerEnum;
import com.jraphql.cn.wzvtcsoft.x.bos.domain.GQLEntity;
import com.jraphql.cn.wzvtcsoft.x.bos.domain.util.BosUtils;
import graphql.Scalars;
import graphql.schema.*;
import org.springframework.beans.BeanUtils;
import org.springframework.core.annotation.AnnotationUtils;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.*;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Member;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static graphql.schema.GraphQLFieldDefinition.newFieldDefinition;
import static graphql.schema.GraphQLInputObjectField.newInputObjectField;
import static graphql.schema.GraphQLInputObjectType.newInputObject;
import static graphql.schema.GraphQLObjectType.newObject;

/**
 * A wrapper for the {@link GraphQLSchema.Builder}. In addition to exposing the traditional builder functionality,
 * this class constructs an initial {@link GraphQLSchema} by scanning the given {@link EntityManager} for relevant
 * JPA entities. This happens at construction time.
 * <p>
 * Note: This class should not be accessed outside this library.
 */


public class GraphQLSchemaBuilder extends GraphQLSchema.Builder implements IGraphQlTypeMapper {
    public static final String PAGINATION_REQUEST_PARAM_NAME = "paginator";
    public static final String QFILTER_REQUEST_PARAM_NAME = "qfilter";
    private static final String MUTATION_INPUTTYPE_POSTFIX = "_";
    private static final String ENTRY_PARENT_PROPNAME = "parent";
    private static final String ENTITY_LIST_NAME = "List";
    private static final String[] QUERY_OUTPUT_FILTER_PROPS = {"id"};
    // in the input entity type under / mutation, the following fields need to be ignored
    private static final Set<String> ENTITYPROP_SET_SHOULDBEIGNORED_IN_MUTATION_ARGUMENT = new HashSet<String>(
            Arrays.asList(ENTRY_PARENT_PROPNAME, "createtime", "updatetime", "createactorid", "updateactorid"));
    private static final GraphQLEnumType fieldNullEnum = getGraphQLEnumType(FieldNullEnum.class);

    private static final GraphQLEnumType orderByDirectionEnum = getGraphQLEnumType(OrderByDirection.class);
    private static final GraphQLEnumType queryFilterOperatorEnum = getGraphQLEnumType(QueryFilterOperator.class);
    private static final GraphQLEnumType queryFilterCombinatorEnum = getGraphQLEnumType(QueryFilterCombinator.class);

    private final EntityManager entityManager;
    private final Map<Method, Object> methodTargetMap = new HashMap<>();
    private final Map<Class, GraphQLScalarType> classGraphQlScalarTypeMap = new HashMap<>();
    private final Map<Class<? extends CareerEnum>, GraphQLEnumType> enumClassGraphQlEnumTypeMap = new HashMap<>();
    // All JPA Entity, Embeddable corresponding GraphQLType, including GraphQLOutputObjectType and GraphQLInputObjectType two types, but also only the two types
    private final Map<GraphQLType, ManagedType> graphQlTypeManagedTypeClassMap = new HashMap<>();
    //The common non-entity class to use for input.
    private final Map<Class, GraphQLInputType> dtoClassGraphQlInputTypeMap = new HashMap<>();

    /**
     * Initialises the builder with the given {@link EntityManager} from which we immediately start to scan for
     * entities to include in the GraphQL schema.
     *
     * @param entityManager The manager containing the data models to include in the final GraphQL schema.
     */
    public GraphQLSchemaBuilder(EntityManager entityManager, Map<Method, Object> methodTargetMap) {
        this(entityManager, methodTargetMap, null);
    }

    public GraphQLSchemaBuilder(EntityManager entityManager, Map<Method, Object> methodTargetMap, Map<Class, GraphQLScalarType> customGraphQLScalarTypeMap) {
        this.entityManager = entityManager;
        this.classGraphQlScalarTypeMap.put(String.class, Scalars.GraphQLString);
        this.classGraphQlScalarTypeMap.put(Integer.class, Scalars.GraphQLInt);
        this.classGraphQlScalarTypeMap.put(int.class, Scalars.GraphQLInt);
        this.classGraphQlScalarTypeMap.put(float.class, Scalars.GraphQLFloat);
        this.classGraphQlScalarTypeMap.put(Float.class, Scalars.GraphQLFloat);
        this.classGraphQlScalarTypeMap.put(double.class, Scalars.GraphQLFloat);
        this.classGraphQlScalarTypeMap.put(Double.class, Scalars.GraphQLFloat);
        this.classGraphQlScalarTypeMap.put(long.class, Scalars.GraphQLLong);
        this.classGraphQlScalarTypeMap.put(Long.class, Scalars.GraphQLLong);
        this.classGraphQlScalarTypeMap.put(boolean.class, Scalars.GraphQLBoolean);
        this.classGraphQlScalarTypeMap.put(Boolean.class, Scalars.GraphQLBoolean);
        this.classGraphQlScalarTypeMap.put(BigDecimal.class, Scalars.GraphQLBigDecimal);
        this.classGraphQlScalarTypeMap.put(short.class, Scalars.GraphQLShort);
        this.classGraphQlScalarTypeMap.put(Short.class, Scalars.GraphQLShort);
        this.classGraphQlScalarTypeMap.put(UUID.class, JavaScalars.GraphQLUUID);
        this.classGraphQlScalarTypeMap.put(Date.class, JavaScalars.GraphQLDate);
        this.classGraphQlScalarTypeMap.put(java.sql.Date.class, JavaScalars.GraphQLSqlDate);
        this.classGraphQlScalarTypeMap.put(LocalDateTime.class, JavaScalars.GraphQLLocalDateTime);
        this.classGraphQlScalarTypeMap.put(Instant.class, JavaScalars.GraphQLInstant);
        this.classGraphQlScalarTypeMap.put(LocalDate.class, JavaScalars.GraphQLLocalDate);
        this.classGraphQlScalarTypeMap.put(Timestamp.class, JavaScalars.GraphQLTimestamp);

        Optional.ofNullable(customGraphQLScalarTypeMap).ifPresent(this.classGraphQlScalarTypeMap::putAll);

        this.methodTargetMap.putAll(methodTargetMap);
        this.enumClassGraphQlEnumTypeMap.put(QueryFilterCombinator.class, queryFilterCombinatorEnum);
        this.enumClassGraphQlEnumTypeMap.put(QueryFilterOperator.class, queryFilterOperatorEnum);
        this.enumClassGraphQlEnumTypeMap.put(OrderByDirection.class, orderByDirectionEnum);
        this.enumClassGraphQlEnumTypeMap.put(FieldNullEnum.class, fieldNullEnum);


        this.dtoClassGraphQlInputTypeMap.put(QueryFilter.class, getDtoInputType(QFILTER_REQUEST_PARAM_NAME, QueryFilter.class));
        this.dtoClassGraphQlInputTypeMap.put(Paginator.class, getDtoInputType(PAGINATION_REQUEST_PARAM_NAME, Paginator.class));

        //this.prepareArgumentInputTypeForMutations();
        super.query(getQueryType());//.mutation(getMutationType());
    }

    private static String getSchemaDocumentation(AnnotatedElement annotatedElement) {
        if (annotatedElement != null) {
            SchemaDocumentation schemaDocumentation = annotatedElement.getAnnotation(SchemaDocumentation.class);
            return schemaDocumentation != null ? schemaDocumentation.value() : null;
        }
        return null;
    }

    private static GraphQLEnumType getGraphQLEnumType(Class<? extends CareerEnum> bosEnumClass) {
        return new GraphQLEnumType(bosEnumClass.getSimpleName(), getSchemaDocumentation(bosEnumClass), Arrays.stream(bosEnumClass.getEnumConstants())
                .map(qfo -> new GraphQLEnumValueDefinition(qfo.getValue(), qfo.getAlias(), qfo.getValue()))
                .collect(Collectors.toList()));
    }

    /**
     * Type of simple DTO input type
     *
     * @param graphQLInputObjectTypeName
     * @param clazz
     * @return
     */
    private GraphQLInputObjectType getDtoInputType(String graphQLInputObjectTypeName, Class clazz) {
        return new GraphQLInputObjectType(graphQLInputObjectTypeName, AnnotationUtils.findAnnotation(clazz, SchemaDocumentation.class).value()
                , Arrays.stream(clazz.getMethods()).filter(method -> AnnotationUtils.findAnnotation(method, SchemaDocumentation.class) != null)
                .map(method -> {
                    Class propType = BeanUtils.findPropertyForMethod(method).getPropertyType();
                    String propName = BeanUtils.findPropertyForMethod(method).getName();
                    String propDoc = AnnotationUtils.findAnnotation(method, SchemaDocumentation.class).value();
                    return newInputObjectField().name(propName).description(propDoc).type(
                            propType == clazz ? GraphQLTypeReference.typeRef(graphQLInputObjectTypeName) : this.getGraphQLInputType(propType)
                    ).build();
                }).collect(Collectors.toList()));
    }

    /**
     * Put in the type of input that might be used in mutation, which is different from the type of input parameters used in the query,
     * they differ by a suffix in the name, the query parameter type structurally contains only scalars, and the mutation parameter type
     * contains nested objects (except for the parent property）
     * Get all possible mutationInputType based on the entity model.
     *
     * @return
     */
    private void prepareArgumentInputTypeForMutations() {
        this.entityManager.getMetamodel().getEntities().stream().filter(this::isNotIgnored).filter(BosUtils.distinctByKey(o -> o.getJavaType()))//Depending on the type of java
                .forEach(type -> {
                    GraphQLInputType inputObjectType = newInputObject()
                            .name(type.getJavaType().getSimpleName() + MUTATION_INPUTTYPE_POSTFIX)
                            .description(getSchemaDocumentation(type.getJavaType()))
                            .fields(type.getAttributes().stream()
                                    .filter(this::isNotIgnoredForEntityInput)//Remove ignore attribute
                                    .map(attribute -> newInputObjectField()
                                            .name(attribute.getName())
                                            .description(getSchemaDocumentation(attribute.getJavaMember()))
                                            .type((GraphQLInputType) getAttributeGraphQLType(attribute, true))
                                            .build())
                                    //Get the corresponding field according to the field properties. GraphQLInputTypeObjectFiled
                                    .collect(Collectors.toList()))
                            .build();
                    this.graphQlTypeManagedTypeClassMap.put(inputObjectType, type);
                    this.additionalType(inputObjectType);// Added to special types so that typereference can be resolved in the end.
                });
    }

    /**
     * @return A freshly built {@link GraphQLSchema}
     * @deprecated Use {@link #build()} instead.
     */
    @Deprecated()
    public GraphQLSchema getGraphQLSchema() {
        return super.build();
    }

    GraphQLObjectType getQueryType() {
        GraphQLObjectType.Builder queryType = newObject().name("QueryType_JPA")
                .description("JPA queries under the DDD domain model, all types have createtime (creation time property), updatedtime (modification time property)");
        // TODO to exclude all entries, the type must have, but not the top, can not start from here query data, you must start from the top of the entity query.
        queryType.fields(entityManager.getMetamodel().getEntities().stream()
                .filter(this::isNotIgnored).map(this::getQueryFieldDefinition).collect(Collectors.toList()));
        queryType.fields(entityManager.getMetamodel().getEntities().stream().filter(this::isNotIgnored).map(this::getQueryFieldPageableDefinition).collect(Collectors.toList()));
        return queryType.build();
    }

    private GraphQLObjectType getMutationType() {
        GraphQLObjectType.Builder queryType = newObject().name("Mutation_SpringMVC").description("Will all SpringMVC.The Requestmapping method in the Controller is exposed");
        queryType.fields(this.methodTargetMap.entrySet().stream().map(entry -> {
            MutationMetaInfo mutationMetaInfo = new DefaultMutationMetaInfo(entry.getValue(), entry.getKey(), this, null);
            return Optional.of(newFieldDefinition()
                    .name(mutationMetaInfo.getMutationFieldName())
                    .description(getSchemaDocumentation((AnnotatedElement) entry.getKey())))
                    .map(fieldDefinition -> fieldDefinition
                            .type(mutationMetaInfo.getGraphQLOutputType())
                    ).get()
                    .dataFetcher(new MutationDataFetcher(entityManager, this, mutationMetaInfo))
                    .argument(mutationMetaInfo.getGraphQLArgumentList())
                    .build();
        }).filter(Objects::nonNull).collect(Collectors.toList()));
        return queryType.build();
    }

    GraphQLFieldDefinition getQueryFieldDefinition(EntityType<?> entityType) {
        return Optional.of(newFieldDefinition()
                .name(entityType.getJavaType().getSimpleName())
                .description(getSchemaDocumentation(entityType.getJavaType())))
                .map(fieldDefinition -> {
                    fieldDefinition.type(
                            getGraphQLOutputTypeAndCreateIfNecessary(entityType))
                            .dataFetcher(new JpaDataFetcher(entityManager, entityType, this));
                    return fieldDefinition;
                }).get()
                .argument(entityType.getAttributes().stream()
                        //Only id and number can be used as query input parameters for a single entity object
                        .filter(attr -> new HashSet<String>(Arrays.asList(QUERY_OUTPUT_FILTER_PROPS)).contains(attr.getName()))
                        .map(attr -> GraphQLArgument.newArgument()
                                .name(attr.getName())
                                .type(JavaScalars.GraphQLUUID)
                                .build()).collect(Collectors.toList()))
                .build();
    }

    // Pageable when querying entity information TODO should add filter condition information
    private GraphQLFieldDefinition getQueryFieldPageableDefinition(EntityType<?> entityType) {
        GraphQLObjectType pageType = newObject()
                .name(getGraphQLTypeNameOfEntityList(entityType))
                .description(getGraphQLTypeNameOfEntityList(entityType) + " Responsible for packing a set of " + entityType.getName() +
                        " data, you can use paging, sorting, filtering and other functions in the query")
                .field(newFieldDefinition().name("totalPages").description("According to paginator.the total number of pages from the size and number of database records")
                        .type(Scalars.GraphQLLong).build())
                .field(newFieldDefinition().name("totalElements").description("Total number of records").type(Scalars.GraphQLLong).build())
                .field(newFieldDefinition().name("content").description("The actual returned table of contents")
                        .type(new GraphQLList(this.getGraphQLOutputTypeAndCreateIfNecessary(entityType))).build())
                .build();

        return newFieldDefinition()
                .name(getGraphQLTypeNameOfEntityList(entityType))
                .description(getGraphQLTypeNameOfEntityList(entityType) + " Responsible for packing a set of " + entityType.getName() +
                        "Data, you can use paging, sorting, filtering and other functions in the query, please use the content field to request the actual field ")
                .type(pageType)
                //Using ExtendedJpaDataFetcher to handle
                .dataFetcher(new CollectionJpaDataFetcher(entityManager, entityType, this))
                .argument(GraphQLArgument.newArgument()
                        .name(PAGINATION_REQUEST_PARAM_NAME)
                        .type(this.dtoClassGraphQlInputTypeMap.get(Paginator.class))
                )
                .argument(GraphQLArgument.newArgument()
                        .name(QFILTER_REQUEST_PARAM_NAME)
                        .type(this.dtoClassGraphQlInputTypeMap.get(QueryFilter.class)))
                .build();
    }

    /**
     * In turn from the map queue to find qualified records corresponding GraphQLInputType, if found then returned, if not found, eventually thrown exception.Similar to four if statements
     *
     * @param typeClazz
     * @return
     */
    @Override
    public GraphQLInputType getGraphQLInputType(Type typeClazz) {
        return Optional.ofNullable((GraphQLInputType) this.classGraphQlScalarTypeMap.get(typeClazz)).orElseGet(() ->
                Optional.ofNullable((GraphQLInputType) this.enumClassGraphQlEnumTypeMap.get(typeClazz)).orElseGet(() ->
                        Optional.ofNullable(this.dtoClassGraphQlInputTypeMap.get(typeClazz)).orElseGet(() ->
                                this.graphQlTypeManagedTypeClassMap.entrySet().stream()
                                        .filter(entry -> entry.getValue().getJavaType().equals(typeClazz) && entry.getKey() instanceof GraphQLInputType)
                                        .map(entry -> (GraphQLInputType) entry.getKey()).findFirst()
                                        .orElseThrow(null))));
    }

    @Override
    public Class getClazzByInputType(GraphQLType graphQLType) {
        return Optional.ofNullable(this.graphQlTypeManagedTypeClassMap.get(graphQLType)).map(entityType -> entityType.getJavaType())
                .orElseGet(() -> this.enumClassGraphQlEnumTypeMap.entrySet().stream().filter(entry -> graphQLType.equals(entry.getValue()))
                        .map(entry -> entry.getKey()).findFirst()
                        .orElseGet(() -> this.dtoClassGraphQlInputTypeMap.entrySet().stream().filter(entry -> graphQLType.equals(entry.getValue()))
                                .map(entry -> entry.getKey()).findFirst()
                                .orElseGet(() -> this.classGraphQlScalarTypeMap.entrySet().stream().filter(entry -> graphQLType.equals(entry.getValue()))
                                        .map(entry -> entry.getKey()).findFirst()
                                        .orElse(null))));
    }

    @Override
    public String getGraphQLTypeNameOfEntityList(EntityType entityType) {
        return entityType.getName() + ENTITY_LIST_NAME;
    }

    @Override
    public CareerEnum getBosEnumByValue(GraphQLEnumType bosEnumType, String enumValue) {
        Class<? extends CareerEnum> enumType = this.getClazzByInputType(bosEnumType);
        return Arrays.stream(enumType.getEnumConstants()).filter(bosEnum -> bosEnum.getValue().equals(enumValue)).findFirst()
                .orElse(null);
    }

    @Override
    public EntityType getEntityType(Class type) {
        return entityManager.getMetamodel().getEntities().stream()
                .filter(et -> et.getJavaType().equals(type)).findFirst().orElse(null);
    }

    private GraphQLOutputType getGraphQLOutputTypeAndCreateIfNecessary(EntityType entityType) {
        return Optional.ofNullable(getGraphQLOutputType(entityType.getJavaType())).orElseGet(() -> {
            GraphQLObjectType graphQLObjectType = newObject().name(entityType.getJavaType().getSimpleName())
                    .fields((List<GraphQLFieldDefinition>) entityType.getAttributes().stream()
                            .filter(attr -> this.isNotIgnored((Attribute) attr))
                            .map(attribute -> {
                                GraphQLOutputType outputType = (GraphQLOutputType) this.getAttributeGraphQLType((Attribute) attribute, false);
                                GraphQLFieldDefinition.Builder builder = newFieldDefinition()
                                        .description(getSchemaDocumentation(((Attribute) attribute).getJavaMember()))
                                        .name(((Attribute) attribute).getName())
                                        .type(outputType);
                                if (outputType instanceof GraphQLScalarType) {
                                    builder.argument(GraphQLArgument.newArgument()
                                            .name(OrderByDirection.ORDER_BY)
                                            .type(orderByDirectionEnum)
                                    );
                                }
                                return builder.build();
                            }).collect(Collectors.toList())).build();
            this.graphQlTypeManagedTypeClassMap.put(graphQLObjectType, entityType);
            return graphQLObjectType;
        });
    }

    @Override
    public GraphQLOutputType getGraphQLOutputType(Type type) {
        return Optional.ofNullable((GraphQLOutputType) this.classGraphQlScalarTypeMap.get(type)).orElseGet(() ->
                Optional.ofNullable((GraphQLOutputType) this.enumClassGraphQlEnumTypeMap.get(type)).orElseGet(() ->
                        this.graphQlTypeManagedTypeClassMap.entrySet().stream()
                                .filter(entry -> entry.getValue().getJavaType().equals(type) && entry.getKey() instanceof GraphQLOutputType)
                                .map(entry -> (GraphQLOutputType) entry.getKey()).findFirst().orElse(null)));
    }

    /**
     * Find the corresponding GraphQLType based on the attribute, and if it is an InputType property, the result can be cast to GraphQLInputType
     *
     * @param attribute
     * @param needInputType -From input type, get its graphql input type
     * @return
     */
    private GraphQLType getAttributeGraphQLType(Attribute attribute, boolean needInputType) {
        if (attribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.BASIC) {
            GraphQLInputType graphQLInputType = getBasicAttributeTypeAndAddBosEnumIfNecessary(attribute.getJavaType());
            if (graphQLInputType != null) {
                return graphQLInputType;
            }
        } else if (attribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.ONE_TO_MANY ||
                attribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.MANY_TO_MANY) {
            EntityType foreignType = (EntityType) ((PluralAttribute) attribute).getElementType();
            return new GraphQLList(new GraphQLTypeReference(foreignType.getName() + (needInputType ? MUTATION_INPUTTYPE_POSTFIX : "")));
        } else if (attribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.MANY_TO_ONE ||
                attribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.ONE_TO_ONE) {
            EntityType foreignType = (EntityType) ((SingularAttribute) attribute).getType();
            return new GraphQLTypeReference(foreignType.getName() + (needInputType ? MUTATION_INPUTTYPE_POSTFIX : ""));
        }
        throw new UnsupportedOperationException(
                "Attribute could not be mapped to GraphQL: field '" + attribute.getJavaMember().getName() + "' of entity class '" + attribute.getDeclaringType().getJavaType().getName() + "'");
    }

    /**
     * Find the type of the underlying type, including enumeration enum, if not found, then return null
     *
     * @param javaType
     * @return
     */
    private GraphQLInputType getBasicAttributeTypeAndAddBosEnumIfNecessary(Class javaType) {
        return Optional.ofNullable((GraphQLInputType) this.classGraphQlScalarTypeMap.get(javaType))
                .orElseGet(() -> Optional.ofNullable(this.enumClassGraphQlEnumTypeMap.get(javaType))
                        .orElseGet(() -> {
                            if (javaType.isEnum() && (CareerEnum.class.isAssignableFrom(javaType))) {
                                GraphQLEnumType gt = getGraphQLEnumType(javaType);
                                this.enumClassGraphQlEnumTypeMap.put((Class<CareerEnum>) javaType, gt);
                                return gt;
                            } else {
                                return null;
                            }
                        }));
    }

    private boolean isValidInput(Attribute attribute) {
        return attribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.BASIC ||
                attribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.ELEMENT_COLLECTION ||
                attribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.EMBEDDED;
    }

    private String getSchemaDocumentation(Member member) {
        return (member instanceof AnnotatedElement) ? getSchemaDocumentation((AnnotatedElement) member) : null;
    }

    private boolean isNotIgnoredForEntityInput(Attribute attribute) {
        return !ENTITYPROP_SET_SHOULDBEIGNORED_IN_MUTATION_ARGUMENT.contains(attribute.getName()) && isNotIgnored(attribute);
    }

    private boolean isNotIgnored(Attribute attribute) {
        boolean isEntryParent = GQLEntity.class.equals(attribute.getJavaType()) && ENTRY_PARENT_PROPNAME.equals(attribute.getName());
        return !isEntryParent && (isNotIgnored(attribute.getJavaMember()) && isNotIgnored(attribute.getJavaType()));
    }

    private boolean isNotIgnored(ManagedType entityType) {
        return GQLEntity.class.isAssignableFrom(entityType.getJavaType()) && isNotIgnored(entityType.getJavaType());
    }

    private boolean isNotIgnored(Member member) {
        return member instanceof AnnotatedElement && isNotIgnored((AnnotatedElement) member);
    }

    private boolean isNotIgnored(AnnotatedElement annotatedElement) {
        if (annotatedElement != null) {
            GraphQLIgnore schemaDocumentation = annotatedElement.getAnnotation(GraphQLIgnore.class);
            return schemaDocumentation == null;
        }
        return false;
    }
}


@SchemaDocumentation("Paging")
class Paginator {
    private int page;
    private int size;

    public Paginator() {
    }

    public Paginator(int page, int size) {
        this.page = page;
        this.size = size;
    }

    public int getPage() {
        return page;
    }

    @SchemaDocumentation("Current page number (starting from 1")
    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    @SchemaDocumentation("Size per page")
    public void setSize(int size) {
        this.size = size;
    }

}
