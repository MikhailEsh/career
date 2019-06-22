package com.jraphql;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.persist.CoreObject;
import graphql.language.Field;
import graphql.schema.DataFetchingEnvironment;
import graphql.schema.GraphQLInputType;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MutationDataFetcher extends CollectionJpaDataFetcher {

    protected MutationMetaInfo mutationMetaInfo;

    public MutationDataFetcher(EntityManager entityManager, IGraphQlTypeMapper graphQlTypeMapper, MutationMetaInfo mutationMetaInfo) {
        super(entityManager, mutationMetaInfo.getEntityType(), graphQlTypeMapper);
        this.mutationMetaInfo = mutationMetaInfo;
    }

    @Override
    public Object getResult(DataFetchingEnvironment environment, QueryFilter queryFilter) {
        Field field = environment.getFields().iterator().next();
        Map<String, Object> nameArgMaps = new HashMap<>();
        field.getArguments().stream()
                //Filter out unwanted input parameters
                .filter(realArg -> this.mutationMetaInfo.getGraphQLArgument(realArg.getName()) != null)
                .forEach(realArg ->
                        nameArgMaps.put(realArg.getName(), convertValue(environment,
                                (GraphQLInputType) this.mutationMetaInfo.getGraphQLArgument(realArg.getName()).getType(),
                                realArg.getValue())));
        Object returnValue = this.mutationMetaInfo.invoke(nameArgMaps);

        // The description returns a simple type, or a collection type that wraps a simple type.
        if (this.entityType == null) {
            return returnValue;
        } else if (returnValue == null) {
            return null;
        } else {//Indicates that the return type is either an entity type or a collection type of an entity type
            if (CoreObject.class.isAssignableFrom(returnValue.getClass())) {//Description returns the primary key
                Object id = ((CoreObject) returnValue).getId();
                queryFilter = new QueryFilter("id", QueryFilterOperator.EQUAL, id.toString(), QueryFilterCombinator.AND, queryFilter);
                return super.getForEntity(environment, queryFilter);
            } else if (Collection.class.isAssignableFrom(returnValue.getClass())) {//Collection type of entity type
                Collection entityCollection = ((Collection) returnValue);
                List<String> idList = (List<String>) entityCollection.stream().map(entity -> ((CoreObject) entity).getId()).collect(Collectors.toList());
                String idstring = StringUtils.collectionToDelimitedString(idList, ",", "'", "'");
                //Set up pagination and filters
                queryFilter = new QueryFilter("id", QueryFilterOperator.IN, idstring, QueryFilterCombinator.AND, queryFilter);
                return super.getResult(environment, queryFilter);
            } else {
                //TODO You can only throw the wrong thing.
                throw new RuntimeException("The return type is not correct. This type is not allowed in mutation.");
            }
        }
    }
}
