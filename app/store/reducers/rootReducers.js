import {combineReducers} from 'redux'
import business from './businessReducer'
import driver from './driverReducer'
import restaurant from './restaurant'
import authenticate from './auth'
import register from './register'




export const reducers = {
  restaurant,
  business,
driver,
auth: authenticate,
register
};


const rootReducer = combineReducers({
  ...reducers,
});


export default rootReducer;