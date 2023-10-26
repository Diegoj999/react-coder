import { useContext, useState } from "react";
import { useTitle } from "../../hooks/useTitle";
import { useOrders } from "../../services/firebase/firestore/orders";
import { toast } from "react-hot-toast";
import Spinner from "../Spinner/Spinner";
import { useAuth } from "../../context/AuthContext";
import { deleteCartDocument } from "../../services/firebase/firestore/cart";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  const { createOrderWithNumber, loading, orderId } = useOrders();
  const { user, profile } = useAuth();
  const { clear } = useContext(CartContext);

  useTitle("Finalizar compra", []);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
      createOrderWithNumber(profile.phoneNumber);
      await deleteCartDocument(user.uid);
      clear();
    
  };

  if (loading) {
    return (
      <div className="container">
        <h1 className="text-center my-5">Generando orden...</h1>
        <Spinner />
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="container mt-5">
        <h1 className="text-center">El Id de su compra es: {orderId}</h1>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Finalizar Compra con tu cuenta</h1>

      <form onSubmit={handleSubmit}>
      
          <button className="d-flex justify-content-center mx-auto btn btn-primary w-25">
            Generar orden
          </button>
       
      </form>
    </div>
  );
};

export default Checkout;
