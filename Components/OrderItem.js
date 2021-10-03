import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Colors from "../constants/Colors";
import ProuctCartItem from "./ProuctCartItem";

function OrderItem({ amount, Date, items }) {
  console.log(items);
  const [showed, setshowed] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.TotaAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{Date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showed ? "Hide Details" : "Show Details"}
        onPress={() => {
          setshowed(!showed);
        }}
      />
      {showed && (
        <View style={styles.detailitem}>
          {items.map((item) => (
            <ProuctCartItem
              key={item.productId}
              quantity={item.ProductQuantity}
              Amount={item.ProductSum}
              Name={item.productTitle}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    elevation: 5,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  TotaAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  detailitem: {
    width: "100%",
  },
});

export default OrderItem;
