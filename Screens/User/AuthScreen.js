import React, { useReducer, useEffect, useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Input from "../../Components/input";
import Card from "../../Components/Card";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import * as AuthActions from "../../Store/actions/Auth";

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

function AuthScreen({ navigation }) {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const dispatch = useDispatch();
  const [SignUp, setSignUp] = useState(false);

  const [formState, dispatchformState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const AuthHandler = async () => {
    let action;
    if (SignUp) {
      action = AuthActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = AuthActions.Login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    seterror(null);
    setloading(true);
    try {
      await dispatch(action);
      navigation.navigate("Shop");
    } catch (e) {
      seterror(e.message);
      setloading(false);
    }
  };

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
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.container}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.AuthCon}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a Valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a Valid Password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.btncon}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={SignUp ? "SignUp" : "Login"}
                  color={Colors.primary}
                  onPress={AuthHandler}
                />
              )}
            </View>
            <View style={styles.btncon}>
              <Button
                title={`Switch to ${SignUp ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  setSignUp(!SignUp);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

AuthScreen.navigationOptions = {
  headerTitle: "Please Authenticate",
};

const styles = StyleSheet.create({
  AuthCon: {
    width: "80%",
    maxWidth: 400,
    height: "50%",
    padding: 20,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btncon: {
    marginTop: 10,
  },
});

export default AuthScreen;
