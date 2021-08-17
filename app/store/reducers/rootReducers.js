import {combineReducers} from 'redux'
import businessReducer from './businessReducer'
import driverReducer from './driverReducer'
import restaurant from './restaurant'


export const reducers = {
  restaurant,
  business: businessReducer,
driver: driverReducer
};


const rootReducer = combineReducers({
  ...reducers,
});


export default rootReducer;