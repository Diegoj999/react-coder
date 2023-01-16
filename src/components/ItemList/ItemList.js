import Item from "../Item/Item"

const ItemList = ({products}) => {

    return (     
        <div className="row d-flex justify-content-center gap-5">
            {products.map(prod => <Item key={prod.id} {...prod}/>)}
        </div>        
    )
}

export default ItemList