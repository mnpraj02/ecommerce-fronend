import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actions";

// initial state of the user
const initialUserState = {
  userData: {},
  isLoggedIn: false,
};
export default function user(state = initialUserState, action) {
  //{ userData, isLoggedIn }
  switch (action.type) {
    // login sucess
    case LOGIN_SUCCESS: {
      return { userData: action.user, isLoggedIn: true };
    }
    // login failure
    case LOGIN_FAILURE: {
      return { userData: {}, isLoggedIn: false };
    }
    // logout
    case LOGOUT: {
      return { userData: {}, isLoggedIn: false };
    }
    default:
      return state;
  }
}
