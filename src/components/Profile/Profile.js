import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../services/firebase/firestore/orders";
import { CartContext } from "../../context/CartContext";
import "./Profile.css";
import { useAsync } from "../../hooks/useAsync";
import Spinner from "../Spinner/Spinner";
import { useTitle } from "../../hooks/useTitle";

const Profile = () => {
  const { user, logout } = useAuth();
  const { clear } = useContext(CartContext);

  const navigate = useNavigate();
  const { userId } = useParams();

  useTitle("Perfil de usuario", [])

  const { getOrdersByUser } = useOrders();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    clear();
  };

  const getOrdersById = () => getOrdersByUser(userId);
  const { data: orders, error, loading } = useAsync(getOrdersById, [userId]);

  if (loading) {
    return (
      <Spinner/>
    );
  }

  if (error) {
    return <h1>Hubo un error al cargas los productos</h1>;
  }

  return (
    <>
      {user && (
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card my-5">
                <div className="bg-primary">
                  <div className="text-center">
                    <img
                      src="https://www.ecured.cu/images/thumb/a/a1/Ejemplo_de_Avatar.png/260px-Ejemplo_de_Avatar.png"
                      className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                      width="200px"
                      alt="profile"
                    />
                  </div>

                  <h4 className="text-center text-white">{user.name}</h4>
                  <p className="text-center text-white">{user.email}</p>
                </div>
                <div className="d-flex flex-column justify-content-center mx-auto">
                  <h3 className="text-center">Ordenes</h3>
                  {orders.length === 0 ? (
                    <p>No hay ordenes</p>
                  ) : (
                    orders.map((order, id) => (
                      <p key={order.id}>{`${id + 1}) ${order.id}`}</p>
                    ))
                  )}
                  <button
                    className="btn btn-danger mb-4 mt-4"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
