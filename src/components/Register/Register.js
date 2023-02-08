import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    cpassword: "",
    name: ""
  });


  const { signup } = useAuth()

  const navigate = useNavigate()

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };

  const handleSubmit = (e) =>{
    e.preventDefault()
   
    if(user.password!==user.cpassword){
      toast.error("Las contraseñas no coinciden")
      return
    }
 
      signup(user.email, user.password, user.name).then(response=>{
    
        if(response===true){
          toast.success("Registro exitoso")
          navigate('/')
        }

        else{
          if(response==='auth/weak-password'){
            toast.error("La contraseña debe contener mas de 6 caracteres")
          }
          else if(response==='auth/email-already-in-use'){
            toast.error("Este e-mail ya está en uso")
          }
          else{
            toast.error("Ocurrio un error al crear tu cuenta")
          }
        }
      })
  }

  return (
    <>

    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card my-5">

          <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>

            <div className="text-center">
              <img src="https://static.vecteezy.com/system/resources/previews/002/387/693/non_2x/user-profile-icon-free-vector.jpg" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile"/>
            </div>

            <div className="mb-3">
              <input type="name" name="name" className="form-control" id="name" aria-describedby="nameHelp"
                placeholder="Nombre" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp"
                placeholder="E-mail" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <input type="password" name="password" className="form-control" id="password" placeholder="Contraseña" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <input type="password" name="cpassword" className="form-control" id="cpassword" placeholder="Repite contraseña" onChange={handleChange}/>
            </div>
            <div className="text-center"><button type="submit" className="btn btn-primary px-5 mb-5 w-100">Registro</button></div>
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
