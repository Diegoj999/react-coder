import { getProductById } from "../../asyncMock"
import {useState, useEffect} from 'react'
import ItemDetails from "../ItemDetails/ItemDetails"

import { useParams } from "react-router-dom"

const ItemDetailContainer =  () =>{
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  const {productId} = useParams();

  useEffect(() => {
    getProductById(productId).then(response => {
        setProduct(response)
    }).finally(() => {
        setLoading(false)
    })
}, [productId])


if(loading){
  return (
    <div className="text-center mt-5">
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  )
}
    return (
        <div>
            <div className="container mt-5 mb-4 p-0 shadow">
              <ItemDetails {...product}/> 
            </div>
                     
        </div>
    )
}

export default ItemDetailContainer