import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../Components/ProductItem";
import * as CartActions from "../../Store/actions/cart";
import * as ProductActions from "../../Store/actions/product";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/HeaderButton";
import Colors from "../../constants/Colors";

function ProductoverviewScreen({ navigation }) {
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [error, seterror] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setrefreshing(true);
    seterror(null);
    try {
      await dispatch(ProductActions.fetchProducts());
    } catch (error) {
      seterror(error.message);
    }
    setrefreshing(false);
  }, [dispatch, setloading, setloading]);

  useEffect(() => {
    const WillFocusSub = navigation.addListener("willFocus", loadProducts);
    return () => {
      WillFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setloading(true);
    loadProducts().then(() => {
      setloading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (productId, ProductTitle) => {
    navigation.navigate("ProductdetailScreen", {
      productId: productId,
      ProductTitle: ProductTitle,
    });
  };

  if (loading) {
    return (
      <View style={styles.centeredItems}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredItems}>
        <Text>An Error occured!</Text>
        <Button
          title="Try Again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <View style={styles.centeredItems}>
        <Text>No Products Available...Maybe you should start adding some!</Text>
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={refreshing}
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.ImageUrl}
          name={itemData.item.name}
          price={itemData.item.price}
          OnSelecting={() => {
            selectItemHandler(itemData.item.id, itemData.item.name);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.name);
            }}
          />
          <Button
            color={Colors.primary}
            title="To cart"
            onPress={() => {
              dispatch(CartActions.add_to_cart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centeredItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

ProductoverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
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
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("ProductCartScreen");
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default ProductoverviewScreen;
