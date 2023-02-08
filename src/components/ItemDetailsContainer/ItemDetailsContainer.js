import ItemDetails from "../ItemDetails/ItemDetails"
import { useParams } from "react-router-dom"
import { getProductById } from '../../services/firebase/firestore/products'
import { useAsync } from '../../hooks/useAsync'
import { useEffect } from "react"
import Spinner from "../Spinner/Spinner"

const ItemDetailContainer =  () =>{
 

  const {productId} = useParams();

  const getProductsWithId = () => getProductById(productId)

  const { data: product, error, loading } = useAsync(getProductsWithId, [productId])

  useEffect(() => {
    document.title = 'Detalle del producto'
}, [])


if(loading){
  return (
    <Spinner/>
  )
}

if(error){
  <h1>hubo un error al cargar el producto</h1>
}
    return (
        <div>
            <div className="container mt-5 mb-4 p-0 ">
              <ItemDetails {...product}/> 
            </div>
                     
        </div>
    )
}

export default ItemDetailContainer