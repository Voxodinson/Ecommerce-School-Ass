import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import Products from "./pages/Products";
import NewArrival from "./pages/NewArrival";
import Contact from "./pages/Contact";
import BestSeller from "./pages/BestSeller";
import ProductDetail from "./pages/ProductDetail";
import Cart from './pages/Cart'
function App() {
  return (
    <Router>
      <NavigationBar/>
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/best_seller" element={<BestSeller />} />
          <Route path="/new_arrival" element={<NewArrival />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
