import './Navbar.css';
import CardWidget from '../CardWidget/CardWidget';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () =>{
    return (
    <nav className='navBar'>
            <Link style={{textDecoration:"none"}} to={'/'}>
                <h1 className='navBar-logo'>Ecommerce</h1>
            </Link>
            <ul className='navBar-menu'>
                <NavLink to={`/category/celular`} className={(({isActive}) => isActive ? 'navBar-item-active' : 'navBar-item-link')}>Celulares</NavLink>
                <NavLink to={`/category/notebook`} className={(({isActive}) => isActive ? 'navBar-item-active' : 'navBar-item-link')}>Notebook</NavLink>
                <NavLink to={`/category/tablet`} className={(({isActive}) => isActive ? 'navBar-item-active' : 'navBar-item-link')}>Tablet</NavLink>
                <div className='navBar-widget'>
                    <CardWidget/>
                </div>
                
            </ul>   
    </nav>
    )
} 

export default Navbar 