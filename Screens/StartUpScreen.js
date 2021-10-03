import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as AuthActions from "../Store/actions/Auth";

const StartUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("Userdata");

      if (!userData) {
        navigation.navigate("Auth");
        return;
      }

      const transformedUserData = JSON.parse(userData);
      const { token, userId, ExpireDate } = transformedUserData;
      const ExpirationDate = new Date(ExpireDate);

      if (ExpirationDate <= new Date() || !token || !userId) {
        navigation.navigate("Auth");
        return;
      }

      const expirationTime = ExpirationDate.getTime() - new Date().getTime();

      navigation.navigate("Shop");
      dispatch(AuthActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.window}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  window: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartUpScreen;
