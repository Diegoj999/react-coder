import { collection, query, documentId, where, getDocs, writeBatch, addDoc } from "firebase/firestore"
import { useContext, useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { CartContext } from "../../../context/CartContext"
import { db } from "../firebaseConfig"

export const useOrders = () =>{

    const {cart, total, clear} = useContext(CartContext)

    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')

    const navigate = useNavigate()

    const createOrderWithNumber = async (number) =>{
        setLoading(true)
        try{
        const objOrder = {
            buyer: {
                id: user.uid,
                name: user.name,
                phone: number,
                email: user.email
            },
            items: cart,
            total 
        }
        console.log(objOrder.items)
        if(objOrder.items.length===0){
            toast.error("Error inesperado, tenés articulos en el carrito?")
            return
        }
       
        const batch = writeBatch(db)

        const ids = cart.map(prod => prod.id)

        const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))

        const productsAddedToCartFromFirestore = await getDocs(productsRef)

        const { docs } = productsAddedToCartFromFirestore

        const outOfStock = []

        docs.forEach(doc =>{
            const dataDoc = doc.data()
            const stockDb = dataDoc.stock

            const productAddedToCart = cart.find(prod=> prod.id === doc.id)
            const prodQuantity = productAddedToCart.quantity
            
            if(stockDb >= prodQuantity){
                batch.update(doc.ref, {stock: stockDb-prodQuantity})
            } else{
                outOfStock.push({id: doc.id, ...dataDoc})
            }
        })

        if(outOfStock.length===0){
            await batch.commit()

            const orderRef = collection(db, 'orders')

            const orderAdded = await addDoc(orderRef, objOrder)

            const {id} = orderAdded

            setOrderId(id)
            clear()

            setTimeout(() => {
                navigate('/')
            }, 5000)


        }else{
            
            console.error('hay productos fuera de stock')
          
        }
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}

    const getOrdersByUser = async (id) => {
        try {
            const ordersRef = collection(db, 'orders')

            const ordersSnapshot =  await getDocs(query(ordersRef, where('buyer.id', '==', id)))
            const { docs } = ordersSnapshot

            const ordersFormatted = docs.map(doc => {
                return { id: doc.id, ...doc.data()}
            })

            return ordersFormatted
        } catch (error) {
            return error
        }
    }

    return {
        createOrderWithNumber,
        getOrdersByUser,
        loading,
        orderId
    }
}
