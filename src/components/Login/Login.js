import { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTitle } from "../../hooks/useTitle";
import { toast } from "react-hot-toast";
import { errorMessages } from "../../Utils/validations";
import { CartContext } from "../../context/CartContext";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = () => {
  useTitle("Login", []);

  const [currentUser, setCurrentUser] = useState(INITIAL_STATE);
  const { login, getCartStorage } = useAuth();
  const { setCart } = useContext(CartContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { state, message } = await login(
        currentUser.email,
        currentUser.password
      );

      if (state === "success") {
        const cart = await getCartStorage();


        if(cart){
          localStorage.setItem("cart", JSON.stringify(cart));
          setCart(cart);
        }
        
        toast.success(message);
        navigate("/");
      } else {
        const errorMessage =
          errorMessages[message] ||
          "Ocurrió un error al iniciar sesión en tu cuenta";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setCurrentUser({ ...currentUser, [name]: value });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form
                className="card-body cardbody-color p-lg-5"
                onSubmit={handleSubmit}
              >
                <div className="text-center">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/002/387/693/non_2x/user-profile-icon-free-vector.jpg"
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="200px"
                    alt="profile"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="E-mail"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 mb-5 w-100"
                  >
                    Login
                  </button>
                </div>
                <div className="form-text text-center mb-5 text-dark">
                  No estás registrado? <Link to="/register">Registrate</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
