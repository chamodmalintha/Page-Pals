import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import ReduxThunk from 'redux-thunk';
//import * as Font from 'expo-font';

import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import ShopNavigator from './navigation/ShopNavigator';
import placesReducer from './store/reducers/places-reducer';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
//   });
// }

export default function App() {
  // const [fontLoaded, setFontLoaded] = useState(false);

  // if(!fontLoaded){
  //   return (
  //     <AppLoading 
  //       // startAsync={fetchFonts}
  //       onFinish={() => {
  //         setFontLoaded(true);
  //       }}
  //     />
  //   );
  // }
  return (
    <Provider store = {store}>
      <ShopNavigator />
    </Provider>
  );
}
