import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../services/firebase/firebaseConfig";
import { profileInfo, userInfo } from "../adapters/profileAdapter";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null)

  const signup = async (email, password, name) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, userInfo(name));

      const profileDoc = doc(db, "profiles", auth.currentUser.uid);

      await setDoc(profileDoc, {
        ...userInfo(name),
        ...profileInfo(auth.currentUser.uid, name),
      });

      return { state: "success", message: "Te has registrado con éxito" };
    } catch (error) {
      return { state: "error", message: error.code };
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      return { state: "success", message: "Has logeado con éxito", currentUser:user};
    } catch (error) {
      return { state: "error", message: error.code };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      return { state: "error", message: error.code };
    }
  };

  async function getProfileData(id) {

    try {
      const profileDoc = await getDoc(doc(db, "profiles", id));
      setProfile(profileDoc.data());
      console.log(profileDoc.data());
    } catch (error) {
      console.error("Error al obtener los datos del perfil:", error);
    }
  }
  
  async function updateProfileData(id, newData) {
    try {
      const profileRef = doc(db, "profiles", id);
  
      setProfile({ ...profile, ...newData });
  
      // Primero, actualiza Firestore
      await updateDoc(profileRef, { ...newData });
  
      console.log("Datos del perfil actualizados en Firestore");
    } catch (error) {
      console.error("Error al actualizar los datos del perfil:", error);
      throw error;
    }
  }

   const getCartStorage = async () => {
    try {
      const cartRef = doc(db, "cartProduct", auth.currentUser.uid);
      const docSnapshot = await getDoc(cartRef);
      console.log("Datos del carrito desde Firestore:", docSnapshot.data().cart);
  
      return docSnapshot.data().cart;
    } catch (error) {
      console.log("Error al obtener el carrito desde Firestore:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
        getProfileData(auth.currentUser.uid);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        profile,
        setProfile,
        updateProfileData,
        getCartStorage
      }}
    >
      {children}
    </authContext.Provider>
  );
}
