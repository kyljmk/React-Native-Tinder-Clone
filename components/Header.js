import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.returnAndTitle}>
        <TouchableOpacity
          style={styles.return}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity style={styles.call}>
          <Foundation name="telephone" size={24} color="#FF5864" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  returnAndTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  return: {
    padding: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  call: {
    marginRight: 10,
    backgroundColor: "#fecaca",
    borderRadius: "50%",
    padding: 10,
    width: 45,
    alignItems: "center",
  },
});
