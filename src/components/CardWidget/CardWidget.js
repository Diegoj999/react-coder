import CarImg from "../../assets/shopping.svg"

const CardWidget = ({totalQuantity})=>{
    return (
            <>
            <img src={CarImg} alt="Cart icon"/>
           <div>
                <p className="pt-3">({totalQuantity})</p>
           </div>
        </>  
    )
}

export default CardWidget;