import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = ()=>{

    return(

  <footer className="footer bg-black p-4">
     <ul className="nav justify-content-center pb-3 mb-3">
        <li className='nav-item'><Link className='nav-link px-2 text-muted' to="/">Home</Link></li>
        <li className='nav-item'><Link className='nav-link px-2 text-muted' to="/category/celular">Celular</Link></li>
        <li className='nav-item'><Link className='nav-link px-2 text-muted' to="/category/notebook">Notebook</Link></li>
        <li className='nav-item'><Link className='nav-link px-2 text-muted' to="/category/tablet">Tablet</Link></li>
    </ul>
    <p className="text-center text-muted">&copy; 2023 Company, Inc</p>
  </footer>

    )


}

export default Footer