import { NavLink } from "react-router-dom";
import { useEffect, useState,  } from "react";
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
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
        const response = await fetch("http://localhost:5000/cartItems");
        
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);// Initialize filtered products with all products
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full h-[10vh] shadow-md flex items-center justify-around">
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
              {products.length}
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
