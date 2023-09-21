import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import NewProduct from './components/NewProduct';
import POS from './components/Pos';
import ProductList from './components/ProductList';
import SalesList from './components/SalesList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NewSale from './NewSale';

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path="/products" element={<ProductList/>} />
            <Route path="/products/new"  element={<NewProduct/>}/>
            <Route path="/sales" element={<SalesList/>} />
            <Route path="/sales/new" element={<NewSale/>} />
            <Route path="/" element={<POS/>} />
            <Route path="/admin/signin" element={<SignIn/>} />
            <Route path="/admin/signup" element={<SignUp/>} />
            {/* Add more routes as needed */}
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    );
}

export default App;