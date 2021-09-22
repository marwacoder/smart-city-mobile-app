import * as actionTypes from '../actions/actionTypes'
  
  const initialState = {
    business: {},
    token: null,
    isLoading: false,
    message: null,
    role: null,
    error: false,
    isLoggedIn: false
  };
  
   export default authenticate =(state = initialState, action)=> {
    switch (action.type) {
      case actionTypes.AUTH_START:
        return {isLoading: true};
      case actionTypes.AUTH_SUCCESS:
        return { 
            error: false,
            message: action.payload.msg,
            isLoading: false,
            auth: action.payload.user,
            token: action.payload.token,
            role: action.payload.role,
            isLoggedIn: true
         };
      case actionTypes.AUTH_FAIL:
        return {
          ...state,
            message: action.payload,
            isLoading: false,
            error: true,
            isLoggedIn: false
        };

        case actionTypes.AUTH_REFRESH:
        return {
        
        };
        
      default:
        return state;
    }
  }