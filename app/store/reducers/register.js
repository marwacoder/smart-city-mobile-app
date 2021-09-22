import * as actionTypes from '../actions/actionTypes'
  
  const initialState = {
    user: {},
    isLoading: false,
    message: null,
    success: false,
    error: false
  };
  
   export default register =(state = initialState, action)=> {
    switch (action.type) {
      case actionTypes.ADD_USER_START:
        return {isLoading: true};
      case actionTypes.ADD_USER_SUCCESS:
        return { 
            error: false,
            message: action.payload.msg,
            isLoading: false,
            success: true
         };
      case actionTypes.ADD_USER_FAIL:
        return {
            message: action.payload,
            isLoading: false,
            error: true
        };

        case actionTypes.ADD_USER_REFRESH:
        return {
      
        };
        
      default:
        return state;
    }
  }