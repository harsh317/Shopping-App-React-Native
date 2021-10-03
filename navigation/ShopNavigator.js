import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import ProductoverviewScreen from "../Screens/Shop/ProductoverviewScreen";
import ProductdetailScreen from "../Screens/Shop/ProductdetailScreen";
import ProductCartScreen from "../Screens/Shop/ProductCartScreen";
import EditProductScreen from "../Screens/User/EditProductScreen";
import OrdersScreen from "../Screens/Shop/OrdersScreen";
import AuthScreen from "../Screens/User/AuthScreen";
import StartUpScreen from "../Screens/StartUpScreen";
import Colors from "../constants/Colors";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserproductScreen from "../Screens/User/UserproductScreen";
import { useDispatch } from "react-redux";
import * as AuthActions from "../Store/actions/Auth";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const productsNavigator = createStackNavigator(
  {
    ProductsOverviewScreen: ProductoverviewScreen,
    ProductdetailScreen: ProductdetailScreen,
    ProductCartScreen: ProductCartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (draweConfig) => (
        <Ionicons
          name={Platform.OS === "ios" ? "ios-list" : "md-list"}
          size={23}
          color={draweConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (draweConfig) => (
        <Ionicons
          name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
          size={23}
          color={draweConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserproductScreen,
    EditProductScreen: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (draweConfig) => (
        <Ionicons
          name={Platform.OS === "ios" ? "ios-create" : "md-create"}
          size={23}
          color={draweConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: productsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Log Out"
              color={Colors.primary}
              onPress={() => {
                dispatch(AuthActions.LOGOUT);
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  StartUpScreen: StartUpScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
