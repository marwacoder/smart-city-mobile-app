import * as actionTypes from '../actions/actionTypes'
  
  const initialState = {
    menus: [],
    isLoading: false,
    message: null,
    error: false
  };
  
   export default restaurant =(state = initialState, action)=> {
    switch (action.type) {
      case actionTypes.ADD_MENU_START:
        return {isLoading: true};
      case actionTypes.ADD_MENU_SUCCESS:
        return { 
            error: false,
            message: action.payload.msg,
            isLoading: false,
            menus: state.menus
         };
      case actionTypes.ADD_MENU_FAIL:
        return {
          ...state,
            message: action.payload,
            isLoading: false,
            error: true
        };

        case actionTypes.ADD_MENU_REFRESH:
        return {
          
        };
        
        case actionTypes.GET_MENU_START:
        return {
          ...state,
            isLoading: true,
            error: false
        };
      case actionTypes.GET_MENU_SUCCESS:
        return { 
          ...state,
            menus:  action.payload.menus,
            isLoading: false,
            error: false
         };
      case actionTypes.GET_MENU_FAIL:
        return {
          ...state,
        error: true,
        isLoading: false
        };
        case actionTypes.GET_MENU_REFRESH:
        return {
         
        };
        case actionTypes.ADD_MENU_CATEGORY_START:
        return {
            isLoading: true,
            error: false
        };
      case actionTypes.ADD_MENU_CATEGORY_SUCCESS:
        return { 
          message: action.payload.msg,
            menus:  action.payload.menus,
            isLoading: false,
            error: false
         };
      case actionTypes.ADD_MENU_CATEGORY_FAIL:
        return {
        error: true,
        message: action.payload,
        isLoading: false
        };
        case actionTypes.ADD_MENU_CATEGORY_REFRESH:
        return {
          
        };
      default:
        return state;
    }
  }