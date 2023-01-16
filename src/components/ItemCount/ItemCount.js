import './ItemCount.css'
import { useState} from 'react';

  const ItemCount = ({onAdd, initial = 1, stock = 0}) =>{

  const [quantity, setQuantity] = useState(initial)

  const increment = () => {
      if(quantity < stock) {
          setQuantity(prev => prev + 1)
      }
  }

  const decrement = () => {
      if(quantity > 1) {
          setQuantity(prev => prev - 1)
      }     
  }

    return(
        <div>
          <div className=' d-flex'>
            <button onClick={increment} className="btnCount">+</button>
              <p className='labelName'>{quantity}</p>
            <button onClick={decrement} className="btnCount">-</button>
          </div>
          <button onClick={() => {(onAdd(quantity))}} className="btn btn-primary" style={{background: "#1F487E"}}>Agregar al carrito</button>
        </div>
    )
  };

  export default ItemCount;

  