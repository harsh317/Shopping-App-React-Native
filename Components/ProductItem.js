import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

function ProductItem({ image, name, price, OnSelecting, children }) {
  let Component = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Component = TouchableNativeFeedback;
  }
  return (
    <View style={styles.productdetails}>
      <View style={{ overflow: "hidden", borderRadius: 10 }}>
        <Component onPress={OnSelecting} useForeground>
          <View>
            <View
              style={{
                width: "100%",
                height: "60%",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                overflow: "hidden",
              }}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri: image }}
              />
            </View>
            <View style={styles.centerview}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttons}>{children}</View>
          </View>
        </Component>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productdetails: {
    elevation: 5,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    height: 300,
  },
  centerview: {
    alignItems: "center",
    padding: 10,
    height: "15%",
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 13,
    color: "#888",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 15,
  },
});

export default ProductItem;
