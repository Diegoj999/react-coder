import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const isEmptyCart = () => {
  return !localStorage.getItem("cart");
};

export const updateCartStorage = async (userID, cart) => {
  const cartRef = doc(db, "cartProduct", userID);

  if (isEmptyCart()) {
    // Si el carrito está vacío, elimina los datos del documento en Firebase
    console.log("Lo borre")
    await deleteDoc(cartRef);
  } else {
    try {
      // Convierte el carrito a un objeto con un campo 'cart' antes de guardarlo
      await setDoc(cartRef, { cart: cart });
    } catch (error) {
      console.error(error);
    }
  }
};

export const deleteCartDocument = async (userID) => {
    const cartRef = doc(db, "cartProduct", userID);
  
    try {
      await deleteDoc(cartRef);
      console.log("Documento en Firebase eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el documento en Firebase:", error);
    }
  };

export const deleteCartStorage = async (docID) => {
  const documentRef = doc(db, "cartProduct", docID); // Reemplaza "tuColección" y "ID_del_documento" con tus valores reales

  // Llama a deleteDoc para borrar el documento
  try {
    await deleteDoc(documentRef);
    console.log("Documento eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
  }
};
