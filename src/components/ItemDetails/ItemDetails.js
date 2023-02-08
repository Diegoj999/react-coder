import "./ItemDetails.css";
import { useContext } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import 'animate.css'
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const ItemDetails = ({
  id,
  name,
  img,
  category,
  description,
  price,
  stock,
}) => {


  const { addItem, isInCart } = useContext(CartContext);
  const { user } = useAuth() 

  const handleOnAdd = (quantity) => {
    if(stock>=quantity){
      toast.success(`Agregaste al carrito ${quantity} de ${name}`)
      addItem({ id, name, price, quantity, img });
    }else{
      toast.error(`No hay stock del producto`)
    }
    
  };

  return (
    <div className="animate__animated animate__bounceInDown shadow pb-5">
      <h2 className="itemDetails-title">{name}</h2>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-5 d-flex justify-content-center">
            <img src={img} alt={name} />
          </div>
          <div className="col-10 col-lg-5 itemDetails-infoContainer">
            <p className="itemDetails-description">
              Descripción:
            </p>
        
            <p>{description}</p>

            <div className="itemDetails-shipment">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-car-front-fill" viewBox="0 0 16 16">
                <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17 1.247 0 3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
              </svg>
              <span>Envío gratis</span>
            </div>


            <div className="d-flex gap-2 ">
              <p className="itemDetails-price">${new Intl.NumberFormat('de-DE').format(price)}</p>
              <p className="itemDetails-priceOld">{new Intl.NumberFormat('de-DE').format(price * 1.25)}</p>
            </div>

            <div className="itemDetails-footer">
              
              {
                !user ?  (<p>Logeate para comprar</p>) : (
              isInCart(id) ? (
                <div className="mt-4 animate__animated animate__fadeInDown">
                    <Link className='itemDetails-btn shadow' to="/cart">Terminar compra</Link>
                </div>
                
              ) : (
                <div>
                  <span className={stock > 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>{stock} en stock</span>
                  <ItemCount onAdd={handleOnAdd} stock={stock} />
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
