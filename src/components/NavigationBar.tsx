import { NavLink } from "react-router-dom";
import { useEffect, useState,  } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '10%',
  left: '50%', // Center horizontally
  transform: 'translate(-50%, -5%)', // Adjust for `top: 5%`
  width: '50%', // Full width
  height: '90vh', // Full viewport height
  backgroundColor: '#fff',
  boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.2)',
};
interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  status: string;
  type: string;
  image_url: string;
}
const NavigationBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const resCartItems = await fetch("http://localhost:5000/cartItems");

        if (!response.ok || !resCartItems.ok)
          throw new Error("Network response was not ok");

        const data = await response.json();
        const cartData = await resCartItems.json();
        setProducts(data);
        setCartItems(cartData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchProducts();
    const interval = setInterval(fetchProducts, 500); 
    return () => clearInterval(interval); 
  }, []);

  const searchItems = searchTerm
  ? products.filter((product) =>
      product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  : [];
  const filterRecommandProducts = products.filter((product) => 
    product.status=== "Featured"
  );
  return (
    <div className="w-full h-[10vh] relative shadow-md flex items-center justify-around">
      <div className="flex items-center justify-between w-[90%]">
        <h3 className="font-thin text-[1.5rem]">
          Vox Decoration
        </h3>
        <div className="flex gap-3 items-center justify-center *:py-1 *:px-4 *:rounded-md">
          {["/", "/products", "/new_arrival", "/best_seller"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) => 
                isActive ? "bg-blue-400 transition-all ease-out duration-400 text-white" : ""
              }
            >
              {["Home", "Shop", "New Arrival", "Best Seller"][index]}
            </NavLink>
          ))}
          <button onClick={handleOpen}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="38px" 
              viewBox="0 -960 960 960" 
              width="38px" 
              fill="#757575">
                <path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z"/>
            </svg>
          </button>
          <NavLink to='/cart' className=" flex items-center justify-center relative ">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="40px" 
              viewBox="0 -960 960 960" 
              width="40px" 
              fill="#5f6368">
                <path d="M292.31-115.38q-25.31 0-42.66-17.35-17.34-17.35-17.34-42.65 0-25.31 17.34-42.66 17.35-17.34 42.66-17.34 25.31 0 42.65 17.34 17.35 17.35 17.35 42.66 0 25.3-17.35 42.65-17.34 17.35-42.65 17.35Zm375.38 0q-25.31 0-42.65-17.35-17.35-17.35-17.35-42.65 0-25.31 17.35-42.66 17.34-17.34 42.65-17.34t42.66 17.34q17.34 17.35 17.34 42.66 0 25.3-17.34 42.65-17.35 17.35-42.66 17.35ZM235.23-740 342-515.38h265.38q6.93 0 12.31-3.47 5.39-3.46 9.23-9.61l104.62-190q4.61-8.46.77-15-3.85-6.54-13.08-6.54h-486Zm-19.54-40h520.77q26.08 0 39.23 21.27 13.16 21.27 1.39 43.81l-114.31 208.3q-8.69 14.62-22.58 22.93-13.88 8.31-30.5 8.31H324l-48.62 89.23q-6.15 9.23-.38 20 5.77 10.77 17.31 10.77h435.38v40H292.31q-35 0-52.23-29.5-17.23-29.5-.85-59.27l60.15-107.23L152.31-820H80v-40h97.69l38 80ZM342-515.38h280-280Z"/>
              </svg>  
            <span className=" absolute top-0 right-2 w-[20px] h-[20px] rounded-full bg-red-500 text-white flex items-center justify-center text-[.8rem]">
              {cartItems.length}
            </span>
          </NavLink>
          
          <NavLink
            to='/Login'
            className="w-fit h-fit rounded-full ml-6">
            <img 
              className="w-[50px] h-[50px] hover:scale-110 transition-all ease-in-out duration-200"
              src="https://i.pinimg.com/474x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg" 
              alt=""/>
          </NavLink>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          width: '100%',
          height: 'fit',
        }}
      >
        <Box sx={style}>  
          <div className="w-full h-full p-3 overflow-auto">
            <div className="w-full flex justify-between ">
              <h3 className="font-semibold text-[1.2rem]">Search</h3>
              <button onClick={handleClose}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  height="24" viewBox="0 -960 960 960"
                  width="24">
                    <path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z"/>
                </svg>
              </button>
            </div>
            <div className="w-full flex-col mt-4 flex items-center justify-center">
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Enter here to search..."
                  className="w-full border-b-[1px] border-gray-400 outline-none py-2 px-2 text-[.9rem]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="top-1 absolute right-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="28px" 
                    viewBox="0 -960 960 960" 
                    width="28px" 
                    fill="#757575">
                      <path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z"/>
                  </svg>
                </button>
              </div>
              <div className="w-full flex flex-col gap-3 mt-2">
                {searchItems.length === 0 && searchTerm ? (
                    <h3 className="text-center text-red-500">Not found...</h3>
                  ) : searchTerm === "" ? (
                    <h3 className="text-center text-gray-500">Enter something...</h3>
                  ) : null
                }
                {searchItems.map((product) => (
                  <Link 
                    onClick={handleClose}
                    to={`/products/${product.id}`} 
                    key={product.id} 
                    className="w-full h-fit items-center gap-4 flex border-[1px] relative border-gray-300 rounded-md overflow-hidden">
                    <div className="w-[60px] h-[60px] overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-center hover:scale-110 transition-all ease-in-out"
                      />
                    </div>
                    <h2 className="font-semibold ">{product.name}</h2>
                    <p className="text-[.9rem] font-semibold">
                      Price: $<span className="text-red-500 font-normal">{product.price}</span>
                    </p>
                  </Link>
                ))}
              </div>
              <div className="w-full mt-2 border-t-[1px] border-gray-400 py-2">
                <h3 className="text-[.8rem] font-semibold">Recommand Products</h3>
                <div className="w-full flex flex-wrap gap-3 py-2">
                  {filterRecommandProducts.map((product) => (
                    <Link 
                      to={`/products/${product.id}`}  
                      key={product.id} 
                      onClick={handleClose}
                      className="overflow-hidden">
                      <div className="w-[70px] h-[70px] overflow-hidden">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-center hover:scale-110 transition-all ease-in-out"
                          />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default NavigationBar;
