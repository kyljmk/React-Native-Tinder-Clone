import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";
import * as Google from "expo-auth-session";

const AuthContext = createContext({});

const config = {
  androidClientId:
    "477243720323-cmaom7bqlnvb78rhsnfsmlc521kjb6mg.apps.googleusercontent.com",
  iosClientId:
    "477243720323-dpq2c3e58cphm57tnbf1dqbfo42779kr.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    Google.logInAsync().then(async (logInresult) => {
      if (logInresult.type === "success") {
        //log in
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user: null, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
