import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ProuctCartItem({ quantity, Amount, Name, RemoveItem, deletable }) {
  let Component = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Component = TouchableNativeFeedback;
  }
  return (
    <View style={styles.cartItem}>
      <View style={styles.ItemData}>
        <Text style={styles.Quantity}>{quantity}</Text>
        <Text style={styles.name}>{Name}</Text>
      </View>
      <View style={styles.ItemData}>
        <Text style={styles.name}>${Amount.toFixed(2)}</Text>
        {deletable && (
          <Component onPress={RemoveItem}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </Component>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  ItemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  Quantity: {
    fontFamily: "open-sans",
    fontSize: 15,
    color: "#888",
    paddingHorizontal: 5,
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    marginHorizontal: 5,
  },
});

export default ProuctCartItem;
