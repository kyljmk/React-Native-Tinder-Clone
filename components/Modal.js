import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigation } from "@react-navigation/native";

const Modal = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || age < 18;
  const navigation = useNavigation();

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timeStamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: "https://links.papareact.com/2pf" }}
        />
        <Text style={styles.welcomeText}>Welcome {user.displayName}</Text>
        <Text style={styles.steps}>Step 1: The Profile Pic</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
          placeholder="Enter your Profile Pic URL"
        />
        <Text style={styles.steps}>Step 2: The Job</Text>
        <TextInput
          style={styles.input}
          value={job}
          onChangeText={setJob}
          placeholder="Enter your occupation"
        />
        <Text style={styles.steps}>Step 3: The Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: incompleteForm ? "#cbd5e0" : "#fc8181" },
          ]}
          onPress={updateUserProfile}
          disabled={incompleteForm}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Modal;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 5,
  },

  image: {
    height: 100,
    width: "100%",
  },

  welcomeText: {
    color: "#a0aec0",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },

  steps: {
    marginTop: 50,
    fontWeight: "bold",
    fontSize: 16,
    color: "#fc8181",
  },

  input: {
    marginTop: 15,
    fontSize: 20,
  },

  button: {
    width: 250,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
