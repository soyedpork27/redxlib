import { combineReducers, configureStore } from "@reduxjs/toolkit";

import storage from 'redux-persist/lib/storage';

import {FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE, persistStore} from 'redux-persist';

// key는 문자열이어야 합니다.
// reducers 는 배열이어야 합니다. 객체를 담으며 state(key)와 reducer(value)로 이루어져야 합니다.
export function mkStore(key, reducers){

  const combinedReducer = combineReducers({
    ...reducers
  });
  
  // ----------------------------------
  
  const persistConfig = {
    key ,
    storage
  };
  
  const persistedReducer = persistReducer(persistConfig, combinedReducer);
  
  
  // ----------------------------------
  
  const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck : {
          ignoreActions : [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
        }
      })
  });
  
  const persistor = persistStore(store);

  return {store, persistor};

}