import "./Navbar.css";
import CardWidget from "../CardWidget/CardWidget";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { totalQuantity } = useContext(CartContext);
  const { user, profile, loading } = useAuth();

  if (loading ) return ;

  return (
    <nav style={{background:"rgba(205, 205, 205, 0.212)"}} className="navbar navbar-expand-lg  ">
      <div className="container-fluid mx-4">
        <Link to={"/"} className="navBar-logo">
          Ecommerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText" // Este ID debe coincidir con el atributo 'id' en el div de abajo.
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mx-3 mt-lg-2">
            <li className="nav-item">
              <Link to={"/category/celular"} className="nav-link">
                Celulares
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/category/notebook"} className="nav-link">
                Notebook
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/category/tablet"} className="nav-link">
                Tablet
              </Link>
            </li>
          </ul>
          <div className="d-flex mx-3">
            <NavLink to={"/cart"} className="text-decoration-none d-flex text-black">
              <CardWidget totalQuantity={totalQuantity} />
            </NavLink>
            {!user ? (
              <Link className="mx-2 text-decoration-none mt-3" to="/login">
                Login
              </Link>
            ) : (
              profile &&
              <img
                src={profile?.photoURL}
                className="mx-2 navBar-img"
                onClick={() => navigate(`/profile/`)}
                alt={`Perfil de ${user.name}`}
              ></img>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;