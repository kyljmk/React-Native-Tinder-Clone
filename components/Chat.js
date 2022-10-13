import { View, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";

const Chat = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Header />
    </SafeAreaView>
  );
};

export default Chat;
