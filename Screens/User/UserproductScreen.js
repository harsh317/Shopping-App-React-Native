import React from "react";
import {
  FlatList,
  Platform,
  Button,
  Alert,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../Components/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/HeaderButton";
import Colors from "../../constants/Colors";
import * as ProductAction from "../../Store/actions/product";

function UserproductScreen({ navigation }) {
  const UserProd = useSelector((state) => state.products.UserProducts);
  const dispatch = useDispatch();

  const editProductScreenHandler = (id) => {
    navigation.navigate("EditProductScreen", {
      productId: id,
    });
  };

  const DeleteHandler = (id) => {
    Alert.alert("Are You Sure", "Do You really want to delte this item?", [
      { text: "NO", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(ProductAction.delete_product(id));
        },
      },
    ]);
  };

  if (UserProd.length === 0) {
    return (
      <View style={styles.constyle}>
        <Text>No Products found, maybe start creating some !!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={UserProd}
      renderItem={(ItemData) => (
        <ProductItem
          image={ItemData.item.ImageUrl}
          name={ItemData.item.name}
          price={ItemData.item.price}
          OnSelecting={() => {
            editProductScreenHandler(ItemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductScreenHandler(ItemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              DeleteHandler(ItemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
}

const styles = StyleSheet.create({
  constyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

UserproductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProductScreen");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserproductScreen;
