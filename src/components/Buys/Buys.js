import React, { useEffect, useState } from "react";
import { useOrders } from "../../services/firebase/firestore/orders";
import Spinner from "../Spinner/Spinner";
import { useAuth } from "../../context/AuthContext";
import "./Buys.css";
import { Link } from "react-router-dom";

const Buys = () => {
  const { user } = useAuth();
  const { getOrdersByUser } = useOrders();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.uid) {
          const userOrders = await getOrdersByUser(user.uid);
          setOrders(userOrders.reverse());
          console.log("Me actualice")
        }
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading || orders === undefined) {
    return <Spinner />;
  }

  console.log(orders);

  return (
    <div className="container my-4">
      <h2 className="mt-2 mb-3 buyItem-title">Historial de compras {">"}<Link className="buyItem-back mx-2" to="/profile">Volver</Link></h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            style={{ background: "rgba(156, 156, 156, 0.192)" }}
            className="w-100 rounded my-4 buyItem"
            key={order.id}
          >
            <div>
              <p className="mx-4 border-bottom">
                Fecha: {order.buyer.date}
                <span style={{ fontWeight: "bold" }}> (ID: {order.id})</span>
              </p>
              {order.items.map((product) => (
                <BuyItem key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No hay órdenes disponibles.</p>
      )}
    </div>
  );
};

export default Buys;

const BuyItem = ({ product }) => {
  return (
    <>
      <div className="d-flex flew-row mx-4 border-bottom my-4">
        <img className="buyItem-image" src={product.img} alt={product.name} />
        <div className=" mx-4">
          <p className="buyItem-text">Entregado</p>
          <p>
            {product.name} ({product.quantity} unidades)
          </p>
          <p>
            Precio total: $
            {new Intl.NumberFormat("de-DE").format(
              product.price * product.quantity
            )}
          </p>
        </div>
      </div>
    </>
  );
};

const BuyContainer = ({ orders }) => {
  <div
    style={{ background: "rgba(156, 156, 156, 0.192)" }}
    className="w-100 rounded my-4 "
  >
    <p className="mx-4 pt-2 border-bottom">
      25 de Septiembre de 2023{" "}
      <span style={{ fontWeight: "bold" }}>(ID: IKh7B47YvLe8aFjQ4S0u)</span>
    </p>
    <div className="d-flex flew-row mx-4">
      <img
        style={{ height: "70px" }}
        src="https://http2.mlstatic.com/D_NQ_NP_612718-MLA52218175587_102022-O.webp"
        alt="asd"
      />
      <div className=" mx-4">
        <p>Apple IPad Air 10.9 Wi-Fi 64 GB - Gris espacial (4 unidades)</p>
        <p>Precio total: $100.000</p>
      </div>
    </div>

    <p className="border-bottom"></p>

    <div className="d-flex flew-row mx-4">
      <img
        style={{ height: "70px" }}
        src="https://http2.mlstatic.com/D_NQ_NP_612718-MLA52218175587_102022-O.webp"
        alt="asd"
      />
      <div className=" mx-4">
        <p>Apple IPad Air 10.9 Wi-Fi 64 GB - Gris espacial (4 unidades)</p>
        <p>Precio total: $100.000</p>
      </div>
    </div>
  </div>;

  return <></>;
};
