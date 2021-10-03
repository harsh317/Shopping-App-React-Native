import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import ProuctCartItem from "../../Components/ProuctCartItem";
import * as CartActions from "../../Store/actions/cart";
import * as OrdersActions from "../../Store/actions/order";

function ProductCartScreen() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.Amount);
  const CartItems = useSelector((state) => {
    const transfirmedtolist = [];
    for (const key in state.cart.items) {
      transfirmedtolist.push({
        productId: key,
        productTitle: state.cart.items[key].productName,
        productPrice: state.cart.items[key].productPrice,
        ProductQuantity: state.cart.items[key].quantity,
        ProductSum: state.cart.items[key].sum,
      });
    }
    return transfirmedtolist.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const sendOrderHandler = async () => {
    setloading(true);
    await dispatch(OrdersActions.ADD_Order(CartItems, totalAmount));
    setloading(false);
  };

  return (
    <View style={styles.window}>
      <View style={styles.summary}>
        <Text style={styles.AmountText}>
          Total Amount:
          <Text style={styles.Amount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={CartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </View>
      <FlatList
        data={CartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(ItemData) => (
          <ProuctCartItem
            quantity={ItemData.item.ProductQuantity}
            Name={ItemData.item.productTitle}
            Amount={ItemData.item.ProductSum}
            RemoveItem={() => {
              dispatch(CartActions.REMOVE_From_Cart(ItemData.item.productId));
            }}
            deletable={true}
          />
        )}
      />
    </View>
  );
}

ProductCartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  window: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 5,
    padding: 10,
    elevation: 5,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 10,
    backgroundColor: "white",
  },
  AmountText: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    fontWeight: "bold",
  },
  Amount: {
    color: Colors.primary,
  },
});

export default ProductCartScreen;
