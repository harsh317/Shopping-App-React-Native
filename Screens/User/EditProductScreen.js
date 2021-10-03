import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../Store/actions/product";
import Input from "../../Components/input";
import Colors from "../../constants/Colors";

const formReducer = (state, action) => {
  if (action.type === "FORM_INPUT_UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updateValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let FormisValid = true;
    for (const key in updateValidities) {
      FormisValid = FormisValid && updateValidities[key];
    }
    return {
      formIsValid: FormisValid,
      inputValidities: updateValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

function EditProductScreen({ navigation }) {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const dispatch = useDispatch();
  const productid = navigation.getParam("productId");
  const ProductToEdit = useSelector((state) =>
    state.products.UserProducts.find((prod) => prod.id === productid)
  );

  const [formState, dispatchformState] = useReducer(formReducer, {
    inputValues: {
      title: ProductToEdit ? ProductToEdit.name : "",
      imageUrl: ProductToEdit ? ProductToEdit.ImageUrl : "",
      price: "",
      description: ProductToEdit ? ProductToEdit.description : "",
    },
    inputValidities: {
      title: ProductToEdit ? true : false,
      imageUrl: ProductToEdit ? true : false,
      price: ProductToEdit ? true : false,
      description: ProductToEdit ? true : false,
    },
    formIsValid: ProductToEdit ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error occurred!", error, [{ text: "Ok" }]);
    }
  }, [error]);

  const SubmitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "Please enter a Valid text in the form", [
        { text: "Ok" },
      ]);
      return;
    }
    setloading(null);
    seterror(false);
    try {
      if (ProductToEdit) {
        await dispatch(
          productActions.Update_Product(
            productid,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          )
        );
      } else {
        await dispatch(
          productActions.Create_Product(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            formState.inputValues.description
          )
        );
      }
      navigation.goBack();
    } catch (err) {
      seterror(err.message);
    }
    setloading(false);
  }, [dispatch, productid, formState]);

  useEffect(() => {
    navigation.setParams({ submit: SubmitHandler });
  }, [SubmitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputvalue, inputisValid) => {
      dispatchformState({
        type: "FORM_INPUT_UPDATE",
        value: inputvalue,
        isValid: inputisValid,
        input: inputIdentifier,
      });
    },
    [dispatchformState]
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          label="Title"
          onInputChange={inputChangeHandler}
          initialValue={ProductToEdit ? ProductToEdit.name : ""}
          initiallyValid={ProductToEdit ? true : false}
          required
        />
        <Input
          id="imageUrl"
          keyboardType="default"
          returnKeyType="next"
          label="Image Url"
          onInputChange={inputChangeHandler}
          initialValue={ProductToEdit ? ProductToEdit.ImageUrl : ""}
          initiallyValid={ProductToEdit ? true : false}
          required
        />

        {ProductToEdit ? null : (
          <Input
            id="price"
            keyboardType="decimal-pad"
            returnKeyType="next"
            label="Price"
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
        )}
        <Input
          id="description"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          label="Description"
          onInputChange={inputChangeHandler}
          multiline
          numberOfLines={3}
          initialValue={ProductToEdit ? ProductToEdit.description : ""}
          initiallyValid={ProductToEdit ? true : false}
          required
          minLength={5}
        />
      </View>
    </ScrollView>
  );
}

EditProductScreen.navigationOptions = (navData) => {
  submitHandlerFunc = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitHandlerFunc}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
