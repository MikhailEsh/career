import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '@career/constants/actions';

const initialState = {
  isAuthenticated: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
