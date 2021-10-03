import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./Store/reducer/product";
import CartReducer from "./Store/reducer/cart";
import NavigationContainer from "./navigation/NavigationContainer";
import OrdersReducer from "./Store/reducer/order";
import AuthReducer from "./Store/reducer/Auth";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

const RootReducer = combineReducers({
  products: productsReducer,
  cart: CartReducer,
  orders: OrdersReducer,
  auth: AuthReducer,
});

const store = createStore(RootReducer, applyMiddleware(ReduxThunk));

const FetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/open-sans-regular.ttf"),
    "open-sans-bold": require("./assets/fonts/open-sans-bold.ttf"),
  });
};

export default function App() {
  const [fontloaded, setfontloaded] = useState(false);
  if (!fontloaded) {
    return (
      <AppLoading
        startAsync={FetchFonts}
        onFinish={() => {
          setfontloaded(true);
        }}
        onError={(err) => {
          console.log(err);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
