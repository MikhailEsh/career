import { gql } from 'apollo-boost';

import { login } from '@career/services/api';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from '@career/constants/actions';
import { graphql } from '@career/services/api';

const introspectionQuery = gql`
query IntrospectionQuery {
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type { ...TypeRef }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

export const logIn = (username, password) => dispatch => {
  return login(username, password)
    .then(user => {
      graphql.query({ query: introspectionQuery }).then(res => {
        user.schema = res.data.__schema;

        return dispatch({
          type: LOGIN_SUCCESS,
          payload: user,
        });
      });
    })
    .catch(error =>
      dispatch({
        type: LOGIN_FAIL,
        payload: { error, username },
      })
    );
};

export const logOut = () => dispatch => {
  return login('logMeOut', 'please')
    .then(() =>
      dispatch({
        type: LOGOUT_FAIL,
      })
    )
    .catch(() =>
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    );
};
