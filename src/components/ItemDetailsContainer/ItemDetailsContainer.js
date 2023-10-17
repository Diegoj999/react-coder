import ItemDetails from "../ItemDetails/ItemDetails";
import { useParams, useNavigate } from "react-router-dom";
import {
  checkProductExist,
  getProductById,
} from "../../services/firebase/firestore/products";
import { useAsync } from "../../hooks/useAsync";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const getProductsWithId = () => getProductById(productId);

  const {
    data: product,
    error,
    loading,
  } = useAsync(getProductsWithId, [productId]);

  useEffect(() => {
    document.title = "Detalle del producto";
  }, []);

  useEffect(() => {
    checkProductExist(productId)
      .then((exists) => {
        if (!exists) {
          navigate("/not-found");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productId, navigate]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    <h1>hubo un error al cargar el producto</h1>;
  }
  return (
    <div>
      <div className="container mt-2 mt-lg-5 mb-4 ">
        <ItemDetails {...product} />
      </div>
    </div>
  );
};

export default ItemDetailContainer;
