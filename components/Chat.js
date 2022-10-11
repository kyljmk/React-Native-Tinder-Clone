import { View, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Chat = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>This is the Chat Screen</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("Home")} />
    </SafeAreaView>
  );
};

export default Chat;
