
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetails.css'

const ItemDetails = ({ id, name, img, category, description, price, stock }) =>{


    const handleOnAdd = (quantity) => {
        console.log(`agregue al carrito ${quantity} de ${name}`)
    }

    return(
        <div>
            <h2 className="itemDetails-title">{name}</h2>
            <div className="container">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <img src={img} alt={name} />
                    </div>
                    <div className="col itemDetails-center">
                        <p style={{fontWeight:"bold", fontSize:"1.4em"}}>Descripción:</p>
                        <p>{description}</p>

                        <div className='d-flex gap-2'>
                            <p className="itemDetails-price">${price * 0.85}</p>
                            <p className="itemDetails-priceOld">{price}</p>
                        </div>
                        
                        <p>{stock} En Stock</p>
                        <ItemCount onAdd={handleOnAdd} stock={stock} />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetails