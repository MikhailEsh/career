import gql from 'graphql-tag';
import { getTime } from 'date-fns';

export const getRuleFineTuningQuery = ruleId => ({
  query: gql`
    query($id: UUID!) {
      RefRulesEntity(id: $id) {
        id
        ruleCode
        isWork
        isGraph
        favourite
        tunings {
          id
          user
          priority
          params {
            id
            name
            value
            defaultValue
            operator
            editable
          }
        }
        ruleGroup
      }
    }
  `,
  variables: {
    id: ruleId,
  },
  fetchPolicy: 'network-only',
});
