import './Navbar.css';
import Button from '../Button/Button'
import CardWidget from '../CardWidget/CardWidget';

const Navbar = () =>{
    return (
    <nav className='navBar'>
        <h1 className='navBar-logo'>Ecommerce</h1>
        <ul className='navBar-menu'>
            <CardWidget/>
            <Button label="Celulares" handleClick={()=> console.log("Tocaste el boton de celulares")}/>
            <Button label="Tablets"  handleClick={()=> console.log("Tocaste el boton de Tablets")}/>
            <Button label="Notebooks"  handleClick={()=> console.log("Tocaste el boton de Notebooks")}/>

        </ul>
    </nav>
    )
} 

export default Navbar 