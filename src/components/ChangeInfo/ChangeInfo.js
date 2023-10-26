import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";


const ChangeInfo = () => {
  const { user, profile, setProfile, updateProfileData } = useAuth();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfileData(user?.uid, profile);
    navigate("/profile");
  };

  const handleChange = ({ target: { name, value } }) => {
    setProfile({ ...profile, [name]: value });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading || !user || !profile) {
    // Si está en proceso de carga o los datos no están disponibles, muestra un Spinner u otra indicación de carga.
    return <Spinner />;
  }

  return (
    <div className="container">
      
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="my-5 ">
            <form
             
              className="card-body cardbody-color p-3 p-lg-4 rounded border"
              onSubmit={handleSubmit}
            >
              <div>
                 
                  <h3 className="text-center mb-4">Cambiar Perfil</h3>
                  <p style={{ fontSize: "14px" }}>
                    Llena los campos con tu información de perfil
                  </p>
                </div>

                <div className="mb-3">
                <label htmlFor="displayName" className=" mb-1 mx-1 text-sm">
                  Nombre
                </label>
                <input
                  type="text"
                  name="displayName"
                  className="form-control"
                  id="displayName"
                  placeholder="Nombre.."
                  value={profile.displayName}
                  required
                  disabled
                />
              </div>


              <div className="mb-3">
                <label htmlFor="phoneNumber" className=" mb-1 mx-1 text-sm">
                  Telefono
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Telefono.."
                  onChange={handleChange}
                  value={profile.phoneNumber ?? ""}
                  required
                />
              </div>

              <div className="mb-2 pt-2">
              <label htmlFor="phoneNumber" className=" mb-1 mx-1 text-sm">
                  Ciudad
                </label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  id="city"
                  placeholder="Ciudad.."
                  onChange={handleChange}
                  value={profile.city ?? ""}
                  required
                />
              </div>

              <div className="d-flex justify-content-between pt-4">
                <Link
                  to={"/profile"}
                  className="text-decoration-none mt-2"
                  style={{ fontSize: "14px" }}
                >
                 Volver al Perfil
                </Link>
                <button type="submit" style={{ background: "#1f487e" }} className="btn btn-primary btn-sm">
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfo;
