import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useTailwind } from "tailwind-rn/dist";

const LoginScreen = () => {
  const { login } = useAuth();
  const tw = useTailwind();

  return (
    <View style={styles.screen}>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign in & swipe</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  background: {
    flex: 1,
    alignItems: "center",
  },

  button: {
    position: "absolute",
    bottom: "20%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default LoginScreen;
