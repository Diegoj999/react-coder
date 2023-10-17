import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../services/firebase/firestore/orders";
import { CartContext } from "../../context/CartContext";
import "./Profile.css";
import { useAsync } from "../../hooks/useAsync";
import Spinner from "../Spinner/Spinner";
import { useTitle } from "../../hooks/useTitle";
import { DollarIcon, EditCoin, ProfileIcon } from "../Icons/Icons";
import { uploadFile } from "../../services/firebase/firebaseConfig";
import toast from "react-hot-toast";
import {
  deleteCartDocument,
  updateCartStorage,
} from "../../services/firebase/firestore/cart";

const ChangeAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        style={{ background: "#1f487e" }}
        className="btn btn-primary"
        onClick={openModal}
      >
        Editar avatar
      </button>
      {isOpen && <ChangeAvatarModal onClose={closeModal} />}
    </>
  );
};

const ChangeAvatarModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const modalRef = useRef(null);

  const { user, updateProfileData } = useAuth();

  useEffect(() => {
    // Agregar un manejador de eventos al documento para detectar clics fuera del modal
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    // Agregar el manejador de eventos cuando se muestra el modal
    document.addEventListener("mousedown", handleClickOutside);

    // Eliminar el manejador de eventos cuando se desmonta el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file === null) return toast.error("No hay archivo");

    try {
      setIsUploading(true);
      const result = await uploadFile(file);
      updateProfileData(user.uid, { photoURL: result });
      onClose(); // Cierra el modal después de una subida exitosa
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="modal-container" ref={modalRef}>
      <form onSubmit={handleSubmit} className="modal-content w-50">
        <input
          type="file"
          name=""
          id=""
          className="my-2"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          disabled={isUploading}
          style={{ background: "#1f487e" }}
          className="btn btn-primary"
          type="submit"
        >
          {isUploading ? "Subiendo..." : "Subir"}
        </button>
      </form>
    </div>
  );
};
const Profile = () => {
  const { user, profile, logout } = useAuth();

  const { clear,  } = useContext(CartContext);

  const navigate = useNavigate();

  const { getOrdersByUser } = useOrders();
  console.log(localStorage.getItem('cart'))
  const asd = JSON.parse(localStorage.getItem('cart'))
  console.log(asd)

  const handleLogout = async () => {
    // Obtén el carrito del LocalStorage
    const cartData = localStorage.getItem('cart');
  
    if (cartData) {
      // El carrito local existe y contiene datos, actualiza Firebase
      await updateCartStorage(user.uid, JSON.parse(cartData));
    } else {
      // El carrito local no existe o está vacío, borra el documento en Firebase
      await deleteCartDocument(user.uid);
    }

    clear()
  
    // Realiza el logout
    await logout();
    navigate("/login");
  };
  


  const confirmLogout = async () => {
    if (window.confirm("Estás seguro que quieres cerrar sesión?")) {

      handleLogout();
    }
  };

  const getOrdersById = () => getOrdersByUser(user && user.uid);
  const { error, loading } = useAsync(getOrdersById, [user && user.uid]);

  useTitle(`Mi Perfil | Ecommerce`, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <h1>Hubo un error al cargas los productos</h1>;
  }

  return (
    <>
      {user && (
        <div className="animate__animated animate__bounceInDown container my-4 profile-principal">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="border rounded  bg-white profile-container ">
                <img
                  src={profile.photoURL}
                  className=" profile-img rounded-circle mx-0"
                  alt="profile"
                />

                <div className="d-flex flex-column pt-3 mx-lg-3">
                  <h4 className="profile-text-name">{profile.displayName}</h4>
                  <p className="profile-text-email">{user.email}</p>
                  <ChangeAvatar />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-8 offset-md-2">
              <div className="px-4 border rounded pt-2 bg-white">
                <div className="d-flex flex-column info-title mt-2 border-bottom">
                  Información Personal
                </div>

                <div className="d-flex  gap-5">
                  <div className="mt-3 info-item">
                    <p className="info-text-color">Nombre</p>
                    <p className="info-text-color mt-2">Email</p>
                    <p className="info-text-color mt-2">Telefono</p>
                    <p className="info-text-color mt-2">Ciudad</p>
                  </div>
                  <div className="mt-3 info-item">
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                    <p>
                      {profile.phoneNumber === ""
                        ? "Sin datos.."
                        : profile.phoneNumber}
                    </p>
                    <p>{profile.city === "" ? "Sin datos.." : profile.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-8 offset-md-2">
              <div className="px-4 border rounded pt-2 bg-white">
                <div className="d-flex flex-column info-title mt-2 border-bottom">
                  Configuración Avanzada
                </div>

                <div className="my-4 d-flex flex-column">
                  <Link className="mb-1" to="/profile/change-info">
                    <EditCoin width={18} height={18} className={"pb-1 mx-1"} />
                    Cambiar informacion
                  </Link>
                  <Link className="" to="/profile/change-password">
                    <EditCoin width={18} height={18} className={"pb-1 mx-1"} />
                    Cambiar contraseña
                  </Link>

                  <Link className="my-1" to="/profile/buys">
                    <DollarIcon width={22} height={22} className={"pb-1 "} />
                    Historial de Compras
                  </Link>

                  <button
                    className="btn btn-danger mt-4 btn-logout"
                    onClick={confirmLogout}
                  >
                    <ProfileIcon
                      width={24}
                      height={20}
                      className={"mb-1 px-1"}
                    />
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
