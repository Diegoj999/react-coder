import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase/firebaseConfig";

const authContext = createContext();

const formatUser = (fUser) => {
  return {
    uid: fUser.uid,
    email: fUser.email,
    name: fUser.displayName,
  };
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fixUser, setFixUser] = useState(false);

  const signup = async (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, { displayName: name });
        setFixUser(true);
        return true;
      })
      .catch((error) => {
        console.log(error.code);
        return error.code;
      });
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        return true;
      })
      .catch((error) => {
        return error.code;
      });
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);

      if (currentUser) {
        setUser(formatUser(currentUser));
      } else {
        setUser(null);
        setFixUser(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [fixUser]);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading
      }}
    >
      {children}
    </authContext.Provider>
  );
}
