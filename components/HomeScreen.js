import {
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
  View,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout, user } = useAuth();
  console.log(user);

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoImageContainer}>
          <Image
            source={require("../tinderlogo.png")}
            style={styles.logoImage}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    position: "absolute",
    left: 5,
    top: 3,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },

  logoImageContainer: {},

  logoImage: {},
});

export default HomeScreen;
