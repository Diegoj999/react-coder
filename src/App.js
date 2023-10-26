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
import NotFound from './components/NotFound/NotFound';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ChangeInfo from './components/ChangeInfo/ChangeInfo';
import Buys from './components/Buys/Buys';
import Testing from './components/Testing/Testing';



function App() {


  return (

    <div className='app'>
      <CartProvider>
        <AuthProvider>
        <BrowserRouter>
          <Toaster/>
          <Testing/>
          <Navbar/>
          <Routes>
            <Route path='/' element={<ItemListContainer greeting={"Todos nuestros productos"}/>}/>
            <Route path='/category/:categoryId' element={<ItemListContainer greeting="Productos filtrados"/>}/>
            <Route path='/detail/:productId' element={<ItemDetailsContainer/>}/>
            <Route path='/cart' element={<CartContainer />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/login' element={<ProtectedRoute><Login/></ProtectedRoute>} />
            <Route path='/register' element={<ProtectedRoute><Register/></ProtectedRoute>} />
            <Route path='/profile/' element={<Profile/>} />
            <Route path='/profile/change-password' element={<ChangePassword/>} />
            <Route path='/profile/change-info' element={<ChangeInfo/>} />
            <Route path='/profile/buys' element={<Buys/>}/>
            <Route path="/not-found" element={<NotFound/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </div>
  );
}

export default App;
