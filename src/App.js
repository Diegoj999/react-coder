import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailsContainer from './components/ItemDetailsContainer/ItemDetailsContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CartContainer from './components/CartContainer/CartContainer';
import Footer from './components/Footer/Footer';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { AuthProvider } from './context/AuthContext';
import Profile from './components/Profile/Profile';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';



function App() {


  return (

    <div className='app'>
      <CartProvider>
        <AuthProvider>
        <BrowserRouter>
          <Toaster/>
          <Navbar/>
          <Routes>
            <Route path='/' element={<ItemListContainer greeting={"Todos nuestros productos"}/>}/>
            <Route path='/category/:categoryId' element={<ItemListContainer greeting="Productos filtrados"/>}/>
            <Route path='/detail/:productId' element={<ItemDetailsContainer/>}/>
            <Route path='/cart' element={<CartContainer />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/login' element={<ProtectedRoute><Login/></ProtectedRoute>} />
            <Route path='/register' element={<ProtectedRoute><Register/></ProtectedRoute>} />
            <Route path='/profile/:userId' element={<Profile/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </div>
  );
}

export default App;
