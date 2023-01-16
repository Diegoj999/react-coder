import ItemList from "../ItemList/ItemList"
import {getProducts, getProductsByCategory } from "../../asyncMock"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const ItemListContainer = ({greeting})=>{

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const {categoryId} = useParams()

  useEffect(() =>{
    
    const asyncFunction = !categoryId ? getProducts : getProductsByCategory

    asyncFunction(categoryId).then(response =>{
      setProducts(response)
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
     
  }, [categoryId])

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
            <h1 style={{ textAlign:"center", marginTop: "0.5em", marginBottom: "1em"}}>{!categoryId ? greeting : categoryId[0].toUpperCase() + categoryId.substring(1)}</h1>
            <div className="container mb-5">
              <ItemList products={products}/> 
            </div>
                     
        </div>
    )
}

export default ItemListContainer