import React from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Importar componentes de Formik
import { validatePasswords } from "../../Utils/validations";
import { changeUserPassword, reauthenticateUser } from "../../services/firebase/firestore/profileConfig";

const INITIAL_STATE = {
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
};

const ChangePassword = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  

  const handleSubmit = async (values) => {
    if (values.newPassword !== values.repeatPassword) {
      console.log("Las contraseñas no coinciden");
    }

    try {
      const authenticatedUser = await reauthenticateUser(
        user,
        user.email,
        values.oldPassword
      );
      const result = await changeUserPassword(
        authenticatedUser,
        values.newPassword
      );

      toast.success(result);
      navigate("/profile");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        return console.log("La contraseña antigua es incorrecta");
      }

      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div className="my-5 ">

            <Formik
              initialValues={INITIAL_STATE}
              onSubmit={handleSubmit}
              validate={validatePasswords} 
            >
              <Form style={{marginTop:"100px"}} className="card-body cardbody-color p-3 p-lg-4 rounded border">
                <div>
                  <ErrorMessage
                    name="general"
                    component="div"
                    className="error"
                  />
                  <h3 className="text-center mb-4">Cambiar contraseña</h3>
                  <p style={{ fontSize: "14px" }}>
                    Llena los campos para cambiar la contraseña
                  </p>
                </div>

                <div className="mb-3">
                  <Field
                    type="password"
                    name="oldPassword"
                    className="form-control"
                    id="oldPassword"
                    placeholder="Contraseña actual.."
                    required
                  />
                  <ErrorMessage
                    name="oldPassword"
                    component="div"
                    className="error text-danger"
                    style={{ fontSize: "14px" }}
                  />
                </div>

                <div className="mb-3 pt-4">
                  <Field
                    type="password"
                    name="newPassword"
                    className="form-control"
                    id="newPassword"
                    placeholder="Contraseña nueva.."
                    required
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="error text-danger"
                    style={{ fontSize: "14px" }}
                  />
                </div>

                <div className="mb-3">
                  <Field
                    type="password"
                    name="repeatPassword"
                    className="form-control"
                    id="repeatPassword"
                    placeholder="Repite la contraseña.."
                    required
                  />
                  <ErrorMessage
                    name="repeatPassword"
                    component="div"
                    className="error text-danger"
                    style={{ fontSize: "14px" }}
                  />
                </div>

                <div className="d-flex justify-content-between pt-4">
                  <Link
                    to={"/profile"}
                    className="text-decoration-none mt-2"
                    style={{ fontSize: "14px" }}
                  >
                    Return to Profile
                  </Link>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Save changes
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
