const Button = ({label, handleClick})=>{
    return (
        <li className='navBar-item' onClick={handleClick}>{label} </li>
    )
}

export default Button