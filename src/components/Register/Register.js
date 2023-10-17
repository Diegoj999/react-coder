import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { errorMessages } from "../../Utils/validations";

const INITIAL_STATE = {
  email: "",
  password: "",
  cpassword: "",
  name: "",
};

const Register = () => {
  const [user, setUser] = useState(INITIAL_STATE);

  const { signup } = useAuth();

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.cpassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      const { state, message } = await signup(
        user.email,
        user.password,
        user.name
      );

      if (state === "success") {
        toast.success(message);
        navigate("/");
      } else {
        const errorMessage =
          errorMessages[message] ||
          "Ocurrió un error al iniciar sesión en tu cuenta";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error)
    }
  };

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
                    type="name"
                    name="name"
                    className="form-control"
                    id="name"
                    aria-describedby="nameHelp"
                    placeholder="Nombre"
                    onChange={handleChange}
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
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="cpassword"
                    className="form-control"
                    id="cpassword"
                    placeholder="Repite contraseña"
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 mb-5 w-100"
                  >
                    Registro
                  </button>
                </div>
                <div className="form-text text-center mb-5 text-dark">
                  Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
