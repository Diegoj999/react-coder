import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function reauthenticateUser(userAuth, email, currentPassword) {
  const credential = EmailAuthProvider.credential(email, currentPassword);

  try {
    await reauthenticateWithCredential(userAuth, credential);
    return userAuth;
  } catch (error) {
    throw error;
  }
}

export async function changeUserPassword(userAuth, newPassword) {
  try {
    await updatePassword(userAuth, newPassword);
    return "Contraseña actualizada con éxito";
  } catch (error) {
    throw error; // Manejar errores al cambiar la contraseña
  }
}

export async function getUserInfo(userAuth) {
  try {
    const profileDoc = doc(db, "profiles", userAuth.uid);

    const profileSnapshot = await getDoc(profileDoc);

    const profileData = profileSnapshot.data();
    console.log(profileData);
    return "Éxito";
  } catch (error) {
    throw error;
  }
}


