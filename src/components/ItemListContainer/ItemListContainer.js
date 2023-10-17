import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { useAsync } from '../../hooks/useAsync'
import { useTitle } from '../../hooks/useTitle'
import { getProducts } from '../../services/firebase/firestore/products'
import Spinner from '../Spinner/Spinner'

const ItemListContainer = ({ greeting }) => {

    const { categoryId } = useParams()

    const haveCategory = (greeting) => !categoryId ? greeting : categoryId.charAt(0).toUpperCase() + categoryId.slice(1) 

    useTitle(haveCategory(greeting) + " | Ecommerce", [categoryId])


    const getProductsWithCategory = () => getProducts(categoryId)

    const { data: products, error, loading } = useAsync(getProductsWithCategory, [categoryId])


      if(loading){
        return (
          <Spinner/>
        )
      }

    if(error) {
        return <h1>Hubo un error al cargas los productos</h1>
    }

    return (
        <div className='container mt-4 mb-5'>
            <h1 className='text-center mb-4'>{haveCategory(greeting)}</h1>
            <ItemList products={products} />
      
        </div>
    )
}

export default ItemListContainer