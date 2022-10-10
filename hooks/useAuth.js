import { createContext, useState, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(false);

  const login = () => {
    setuser(true);
  };

  const logout = () => {
    setuser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

/*import { View, Text } from "react-native";
import React, { createContext, useContext, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import { auth, db } from "../Firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "477243720323-cmaom7bqlnvb78rhsnfsmlc521kjb6mg.apps.googleusercontent.com",
    expoClientId:
      "477243720323-dpq2c3e58cphm57tnbf1dqbfo42779kr.apps.googleusercontent.com",
    androidClientId:
      "477243720323-am0lnhvnucup48jc7t5tnoijmit0hc6m.apps.googleusercontent.com",
    iosClientId:
      "477243720323-dpq2c3e58cphm57tnbf1dqbfo42779kr.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Logged in...
        setUser(user);
      } else {
        // Not logged in...
        setUser(null);
      }
    });
  }, [response]);

  const signInWithGoogle = async () => {
    await promptAsync()
      .then(async (logInresult) => {
        if (logInresult.type === "success") {
          //log in
          const { idToken, accessToken } = logInresult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((error) => setError(error));
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

/*
import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";
import * as Google from "expo-app-auth";

const AuthContext = createContext({});

const config = {
  expoClientId:
    "477243720323-36vhv9omqo8s9leteuejs1ksa80fu0l3.apps.googleusercontent.com",
  androidClientId:
    "477243720323-cmaom7bqlnvb78rhsnfsmlc521kjb6mg.apps.googleusercontent.com",
  iosClientId:
    "477243720323-dpq2c3e58cphm57tnbf1dqbfo42779kr.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    Google.logInAsync(config).then(async (logInresult) => {
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
}*/
