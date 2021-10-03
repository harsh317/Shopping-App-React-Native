import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/HeaderButton";
import OrderItem from "../../Components/OrderItem";
import * as OrderActions from "../../Store/actions/order";
import Colors from "../../constants/Colors";

function OrdersScreen() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    dispatch(OrderActions.FetchOrders()).then(() => {
      setloading(false);
    });
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.constyle}>
        <Text>No Orders found, maybe start buying some !!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={(Itemdata) => (
        <OrderItem
          amount={Itemdata.item.totalAmount}
          Date={Itemdata.item.readbleDate}
          items={Itemdata.item.items}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
