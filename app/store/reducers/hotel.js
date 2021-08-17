import * as actionTypes from '../actions/actionTypes'
  
  const initialState = {
    rooms: [],
    isLoading: false,
    message: null,
    error: false
  };
  
   export default hotel =(state = initialState, action)=> {
    switch (action.type) {
      case actionTypes.ADD_HOTEL_ROOM_START:
        return {isLoading: true};
      case actionTypes.ADD_HOTEL_ROOM_SUCCESS:
        return { 
            error: false,
            message: action.payload.msg,
            isLoading: false,
            menus: state.rooms
         };
      case actionTypes.ADD_HOTEL_ROOM_FAIL:
        return {
          ...state,
            message: action.payload,
            isLoading: false,
            error: true
        };

        case actionTypes.ADD_HOTEL_ROOM_REFRESH:
        return {
          
        };
        
        case actionTypes.GET_HOTEL_ROOM_START:
        return {
          ...state,
            isLoading: true,
            error: false
        };
      case actionTypes.GET_HOTEL_ROOM_SUCCESS:
        return { 
          ...state,
            menus:  action.payload.rooms,
            isLoading: false,
            error: false
         };
      case actionTypes.GET_HOTEL_ROOM_FAIL:
        return {
          ...state,
        error: true,
        isLoading: false
        };
        case actionTypes.GET_HOTEL_ROOM_REFRESH:
        return {
         
        };
        
      default:
        return state;
    }
  }