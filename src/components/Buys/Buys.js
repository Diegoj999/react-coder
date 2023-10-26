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

