import './Navbar.css';
import CardWidget from '../CardWidget/CardWidget';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext} from 'react';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () =>{

    const navigate = useNavigate()
    const { totalQuantity } = useContext(CartContext)
    const { user, loading } = useAuth()


    if(loading) return <h1>...</h1>

    return (
    <nav className='navBar'>

        <h1 onClick={()=> navigate('/')} className='navBar-logo'>Ecommerce</h1>
          
        <ul className='navBar-menu'>
            <NavLink to={'/category/celular'} className={(({isActive}) => isActive ? 'navBar-item-active' : 'navBar-item-link')}>Celulares</NavLink>
            <NavLink to={'/category/notebook'} className={(({isActive}) => isActive ? 'navBar-item-active' : 'navBar-item-link')}>Notebook</NavLink>
            <NavLink to={'/category/tablet'} className={(({isActive}) => isActive ? 'navBar-item-active' : 'navBar-item-link')}>Tablet</NavLink>
            <div className='navBar-widget'>
            <NavLink to={'/cart'} className='text-decoration-none d-flex text-black'><CardWidget totalQuantity={totalQuantity}/></NavLink>
           { 
            !user ?  <Link className=' mx-4 text-decoration-none' to='/login'>Login</Link>
                :  <button className='btn text-white mx-4' style={{background:"#1F487E"}} onClick={()=>navigate(`/profile/${user.uid}`)}> {user.name}</button>   
           }
            </div>     
        </ul>   
    </nav>
    )
} 

export default Navbar 