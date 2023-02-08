import './Item.css'
import { Link } from 'react-router-dom'

const Item = ({id, name, img, price, stock}) =>{

    return (
              <div className="col-10 col-md-5 col-xl-3 ">
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
                       <p style={{marginRight: "0.5em"}}>${new Intl.NumberFormat('de-DE').format(price)}</p>
                       <p className="card-price-withOutDisc">${new Intl.NumberFormat('de-DE').format(price*1.25)}</p>
                    </div>

                    <Link to={`/detail/${id}`} className="card-button"> Mas Información</Link>
                </div>
                </div>
    )
}

export default Item