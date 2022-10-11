import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth, db } from "../Firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  WebBrowser.maybeCompleteAuthSession();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "477243720323-rrjlspa18mqpie3le536u7gvm9rou7s7.apps.googleusercontent.com",
    expoClientId:
      "477243720323-cmaom7bqlnvb78rhsnfsmlc521kjb6mg.apps.googleusercontent.com",
    androidClientId:
      "477243720323-am0lnhvnucup48jc7t5tnoijmit0hc6m.apps.googleusercontent.com",
    iosClientId:
      "477243720323-dpq2c3e58cphm57tnbf1dqbfo42779kr.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    useProxy: true,
    permissions: ["public_profile", "email", "gender", "location"],
  });

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }

        setLoadingInitial(false);
      }),
    []
  );

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    setLoading(true);

    await promptAsync()
      .then(async () => {
        if (response?.type === "success") {
          const accessToken = response.authentication.accessToken;
          const idToken = response.authentication.idToken;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({ user, loading, error, signInWithGoogle, logout }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
