import './Item.css'
import { Link } from 'react-router-dom'

const Item = ({id, name, img, price, stock}) =>{

    return (
              <div className="col-10 col-md-5 col-xl-3">
                <div className="card-sl">
                    <div className="card-image">
                        <img
                            src={img} alt={name} />
                    </div>

                    <div className="card-heading">
                    {stock === 0 ? <p className="card-sinStock">Sin Stock</p> : <p className="card-stock">En Stock</p>}
                      
                    </div>
                    <div className="card-text">
                       {name}
                    </div>
                    <div className="card-price">
                       <p style={{marginRight: "0.5em"}}>${price * 0.85}</p>
                       <p className="card-price-withOutDisc">${price}</p>
                    </div>

                    <Link to={`/detail/${id}`} className="card-button"> Mas Información</Link>
                </div>
                </div>
    )
}

export default Item