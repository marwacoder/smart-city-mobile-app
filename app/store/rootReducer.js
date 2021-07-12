import { createStore, combineReducers, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import {businessReducer} from './reducers/index'


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['business']
  };

  const rootReducer = combineReducers({
    business: persistReducer(persistConfig, businessReducer)
  });
  
  export const store = createStore(rootReducer, applyMiddleware(thunk));
  export const persistor = persistStore(store);