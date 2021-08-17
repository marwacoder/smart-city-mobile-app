import * as actionTypes from '../actions/actionTypes'
  
  const initialState = {
    data: {},
    isLoading: false,
    error: null,
    message: null
  };
  
  export default  diver =(state = initialState, action)=> {
    switch (action.type) {
      case actionTypes.GET_DRIVERS_LOCATION_START:
        return {isLoading: true};
      case actionTypes.GET_DRIVERS_LOCATION_SUCCESS:
        return { 
          data: action.payload,
          isLoading: false,
          error: false
         };
      case actionTypes.GET_DRIVERS_LOCATION_FAIL:
        return {
        isLoading: false,
        error: true,
        message: action.payload
        };

        case actionTypes.GET_DRIVERS_LOCATION_REFRESH:
        return {
          ...state,
          error: false,
          isLoading: false
        };
        
      default:
        return state;
    }
  }

