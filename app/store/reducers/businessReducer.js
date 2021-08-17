import * as actionTypes from '../actions/actionTypes'
  
  const initialState = {
    business: [],
    isLoading: false,
    error: null,
    message: null
  };
  
   export default business =(state = initialState, action)=> {
    switch (action.type) {
      case actionTypes.ADD_BUSINESS_START:
        return {isLoading: true};
      case actionTypes.ADD_BUSINESS_SUCCESS:
        return { 
            error: false,
            message: action.payload.msg,
            isLoading: false,
            menus: state.business
         };
      case actionTypes.ADD_BUSINESS_FAIL:
        return {
          ...state,
            message: action.payload,
            isLoading: false,
            error: true
        };

        case actionTypes.GET_BUSINESS_START:
          return {isLoading: true};
        case actionTypes.GET_BUSINESS_SUCCESS:
          return { 
              error: false,
              message: action.payload.msg,
              isLoading: false,
              menus: state.business
           };
        case actionTypes.GET_BUSINESS_FAIL:
          return {
            ...state,
              message: action.payload,
              isLoading: false,
              error: true
          };
      default:
        return state;
    }
  }


  
