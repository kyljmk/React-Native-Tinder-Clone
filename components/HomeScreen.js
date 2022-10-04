import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>This is the Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Text>Go to Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
