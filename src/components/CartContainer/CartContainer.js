
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { useTitle } from "../../hooks/useTitle"
import CartList from "../CartList/CartList"



const CartContainer = () => {

    useTitle("Carrito", [])

    const { cart, removeItem, total, totalQuantity, clear } = useContext(CartContext)

    return (
        <div className="container cartContainer">
           <CartList 
           cart={cart} 
           removeItem={removeItem} 
           total={total} 
           totalQuantity={totalQuantity} 
           clear={clear}/> 
        </div>

    )
}

export default CartContainer