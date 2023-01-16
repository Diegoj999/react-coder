import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailsContainer from './components/ItemDetailsContainer/ItemDetailsContainer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<ItemListContainer greeting={"Todos nuestros productos"}/>}/>
          <Route path='/category/:categoryId' element={<ItemListContainer greeting="Productos filtrados"/>}/>
          <Route path='/detail/:productId' element={<ItemDetailsContainer/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
