import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../../constants/actions';

const initialState = {
  username: '',
  roles: [],
  schema: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        roles: action.payload.roles,
        schema: action.payload.schema
      };
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
