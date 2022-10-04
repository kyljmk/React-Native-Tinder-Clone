import { View, Text } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { user } = useAuth();
  return (
    <View>
      <Text>This is the LoginScreen, welcome {user}</Text>
    </View>
  );
};

export default LoginScreen;
