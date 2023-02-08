import { useState } from "react";
import { useTitle } from "../../hooks/useTitle";
import { useOrders } from "../../services/firebase/firestore/orders";
import { toast } from "react-hot-toast";
import Spinner from "../Spinner/Spinner";

const Checkout = () => {
  const { createOrderWithNumber, loading, orderId } = useOrders();
  const [phone, setPhone] = useState("");

  useTitle("Finalizar compra", [])

  const handleSubmit = (e) => {

    e.preventDefault()
    const expRegSoloNumeros="^[0-9]+$";

    if(phone.length===10 && phone.match(expRegSoloNumeros)){

        createOrderWithNumber(phone)
    }
    else{
        toast.error('Número telefonico invalido')
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1 className="text-center my-5">Generando orden...</h1>
        <Spinner/>
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
      <h1 className="text-center">Finalizar Compra con tu cuenta</h1>

    <form onSubmit={handleSubmit}>
      <div className="d-flex flex-column mt-5">
        <input
          type="text"
          name="phone"
          placeholder="Ingrese su telefono"
          className=" mx-auto mb-5 w-25"
          onChange={(e=> setPhone(e.target.value))}
          required
        />
        <button className="btn btn-primary mx-auto w-25">
          Generar orden
        </button>

      </div>
      </form>
    </div>
  );
};

export default Checkout;
