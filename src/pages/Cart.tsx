import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import VisaImage from '../assets/bank_logos/visa.jpg';
import MasterCardImage from '../assets/bank_logos/master-card.jpg'
import Paypal from '../assets/bank_logos/paypal.jpg';
const style = {
  position: 'absolute',
  top: '10%',
  left: '50%', // Center horizontally
  transform: 'translate(-50%, -5%)', // Adjust for `top: 5%`
  width: '80%', // Full width
  height: '90vh', // Full viewport height
  backgroundColor: '#fff',
  boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.2)',
  padding: '12px'
};
interface ICartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLogo, setSelectedLogo] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleSelect = (logoId: any) => {
    setSelectedLogo(logoId);
  };
  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "IN", name: "India" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    // Add more countries as needed
  ];
  const checkoutLogos = [
    {
      id: '1',
      img: VisaImage
    },
    {
      id: '2',
      img: MasterCardImage
    },
    {
      id: '3',
      img: Paypal
    },
  ]
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Apply a discount of 10% if the total exceeds $100
  const discount = totalPrice > 100 ? totalPrice * 0.1 : 0;
  const finalTotal = totalPrice - discount;
  
  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/cartItems");
        if (!response.ok) throw new Error("Failed to fetch cart items");
        const data = await response.json();
        setCartItems(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Handle delete action
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/cartItems/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete cart item");
      
      // Remove the item from the cartItems state
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle increase and decrease quantity
  const handleQuantityChange = async (id: number, type: "increase" | "decrease") => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: type === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );

    // Update the cart item on the server
    try {
      const item = cartItems.find((item) => item.id === id);
      if (!item) return;

      const response = await fetch(`http://localhost:5000/cartItems/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: item.quantity,
        }),
      });

      if (!response.ok) throw new Error("Failed to update cart item quantity");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex flex-col items-center py-10">
      <div className="flex items-start w-[90%] py-2 border-b border-gray-400 mb-6">
        <h2 className="text-[1.2rem] font-semibold">Cart Items</h2>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center mt-6 text-[1.5rem] text-red-500">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="w-[90%] flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3 border border-gray-400 rounded-md grid grid-cols-6 items-center"
              >
                <div className="w-[150px] h-[150px] rounded-md overflow-hidden">
                  <img 
                    src={item.image || 'path/to/default/image.jpg'} 
                    alt={item.name} 
                    className="object-cover w-full h-full" 
                  />
                </div>
                <h4 className="font-semibold block">{item.name}</h4>
                <p>Price: ${item.price}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                    className="w-[30px] h-[30px] border border-gray-400 rounded-md"
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, "increase")}
                    className="w-[30px] h-[30px] border border-gray-400 rounded-md"
                  >
                    +
                  </button>
                </div>
                <p> ${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="ml-4 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30px"
                    viewBox="0 -960 960 960"
                    width="30px"
                    fill="#F44336"
                  >
                    <path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12Q683-160 655.38-160H304.62ZM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-720ZM392.31-280h40v-360h-40v360Zm135.38 0h40v-360h-40v360ZM280-720v520-520Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="w-[90%] flex items-end justify-end">
            <div className="w-1/2 p-4 border border-gray-400 rounded-md mt-6">
              <span className="text-xl font-semibold">Cart Summary</span>
              <ul className="*:border-b-[1px] *:border-gray-300">
                
                <li className="flex justify-between">
                  <span>Subtotal:</span> <span>${totalPrice.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Discount:</span> <span className="text-green-500">${discount.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Total:</span> <span className="text-red-500">${finalTotal.toFixed(2)}</span>
                </li>
              </ul>
              <button
                onClick={handleOpen} 
                className="bg-blue-400 py-2 items-end w-full rounded-md text-white mt-3">
                    Checkout
              </button>
            </div>
          </div>
        </>
      )}
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
        <Box sx={style} > 
          <div className="w-full h-[5vh] flex justify-between border-b-[1px] border-gray-400 pb-2">
            <h3 className="font-semibold text-[1.2rem]">Checkout</h3>
            <button onClick={handleClose}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                height="24" viewBox="0 -960 960 960"
                width="24">
                  <path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z"/>
              </svg>
            </button>
          </div> 
          <div className="h-[82vh] overflow-hidden">
            <div className="w-full flex justify-between h-full gap-3 overflow-auto pr-2">
              <div className="w-[40%] mt-2 h-fit bg-white shadow-md p-3 border-gray-400 border-[1px] rounded-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[.9rem] ">About to Checkout</h3>
                  <button 
                    onClick={handleClose}
                    className=" hover:scale-110 transition-all ease-in-out duration-200">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="#42A5F5">
                          <path d="M200-200h43.92l427.93-427.92-43.93-43.93L200-243.92V-200Zm-40 40v-100.77l527.23-527.77q6.15-5.48 13.57-8.47 7.43-2.99 15.49-2.99t15.62 2.54q7.55 2.54 13.94 9.15l42.69 42.93q6.61 6.38 9.04 14 2.42 7.63 2.42 15.25 0 8.13-2.74 15.56-2.74 7.42-8.72 13.57L260.77-160H160Zm600.77-556.31-44.46-44.46 44.46 44.46ZM649.5-649.5l-21.58-22.35 43.93 43.93-22.35-21.58Z"/>
                      </svg>
                  </button>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                    {cartItems.map((p)=>(
                      <div 
                        className="border-b-[1px] border-gray-200 flex gap-3 py-1 *:text-[.9rem]"
                        key={p.id}>
                          <input type="checkbox" className="bg-gray-600" />
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img 
                                src={p.image} 
                                alt="" 
                                className="w-[50px] h-[50px]"/>
                              <span>{p.name}</span>
                            </div>
                            <span className="text-end">$<span className="text-red-500">{p.price}</span></span>
                          </div>
                      </div>
                    ))}
                </div>
                <div className="w-full mt-2">
                  <ul className="*:border-b-[1px] *:border-gray-300 *:mt-1 *:text-[.9rem]">
                    <li className="flex justify-between">
                      <span>Subtotal:</span> <span>${totalPrice.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Discount:</span> <span>${discount.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between border-none">
                      <span>Total:</span><span>${finalTotal.toFixed(2)}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-[55%] mt-2 h-[80vh]">
                <h3 className="font-semibold border-b-[1px] border-gray-400 w-full">Checkout Method</h3>
                <form 
                  action="post"
                  className="flex w-full flex-col pb-4">
                    <div className="">
                      <h3 className="font-semibold text-[.9rem] mt-4">Payments</h3>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-3 mt-4">
                      {checkoutLogos.map((logo) => (
                        <div
                          key={logo.id}
                          className={`w-full flex items-center justify-between p-3 overflow-hidden rounded-md h-[100px] border-[1px] transition-all ease-in-out duration-300 
                          ${
                            selectedLogo === logo.id ? 'border-blue-500' : 'border-gray-200'
                          } cursor-pointer`}
                          onClick={() => handleSelect(logo.id)}
                        >
                          <input
                            type="radio"
                            id={logo.id}
                            name="checkoutLogo"
                            checked={selectedLogo === logo.id}
                            onChange={() => handleSelect(logo.id)} 
                          />
                          <img
                            className="w-[150px] object-scale-down"
                            src={logo.img}
                            alt={logo.img}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="">
                      <h3 className="font-semibold text-[.9rem] mt-4">Payments</h3>
                    </div>
                    <div className="w-full mt-2 flex flex-wrap gap-3">
                      <div className="flex flex-col w-[calc(100%)]">
                        <label 
                          htmlFor=""
                          className="text-[.9rem]">
                          Name on Card
                        </label>
                        <input 
                          type="text" 
                          placeholder="Required"
                          className="w-full border-[1px] border-gray-400 outline-none py-1 px-2 rounded-md"
                          required/>
                      </div>
                      <div className="flex flex-col w-[calc(100%)]">
                        <label 
                          htmlFor=""
                          className="text-[.9rem]">
                          Credit card number
                        </label>
                        <input 
                          type="text" 
                          placeholder="0000 - 0000 - 0000 - 0000"
                          className="w-full border-[1px] border-gray-400 outline-none py-1 px-2 rounded-md"/>
                      </div>
                      <div className="flex flex-col w-[calc(98%/2)]">
                        <label 
                          htmlFor=""
                          className="text-[.9rem]">
                          Expired date
                        </label>
                        <input 
                          type="text" 
                          placeholder="MM / YY"
                          className="w-full border-[1px] border-gray-400 outline-none py-1 px-2 rounded-md"/>
                      </div>
                      <div className="flex flex-col w-[calc(98%/2)]">
                        <label 
                          htmlFor=""
                          className="text-[.9rem]">
                          CVC / CVV
                        </label>
                        <input 
                          type="text" 
                          placeholder="CVC"
                          className="w-full border-[1px] border-gray-400 outline-none py-1 px-2 rounded-md"/>
                      </div>
                    </div>
                    <h3 className="font-semibold text-[.9rem] mt-4">
                      Billing Address
                    </h3>
                    <div className="w-full mt-2 flex flex-wrap gap-3">
                      <div className="flex flex-col w-[calc(98%/2)]">
                        <label 
                          htmlFor=""
                          className="text-[.9rem]">
                          Firstname
                        </label>
                        <input 
                          type="text" 
                          placeholder="Firstname"
                          className="w-full border-[1px] border-gray-400 outline-none py-1 px-2 rounded-md"/>
                      </div>
                      <div className="flex flex-col w-[calc(98%/2)]">
                        <label 
                          htmlFor=""
                          className="text-[.9rem]">
                          Lastname
                        </label>
                        <input 
                          type="text" 
                          placeholder="Lastname"
                          className="w-full border-[1px] border-gray-400 outline-none py-1 px-2 rounded-md"/>
                      </div>
                      <div className="flex flex-col w-[100%]">
                        <label 
                          htmlFor=""
                          className="text-[.9rem]">
                          Email
                        </label>
                        <input 
                          type="text" 
                          placeholder="Email"
                          className="w-full border-[1px] border-gray-400 outline-none py-1 px-2 rounded-md"/>
                      </div>
                      <div className="flex flex-col w-[calc(98%/2)] ">
                        <label 
                          htmlFor=""
                          className="text-[.9rem]">
                          Phone Number
                        </label>
                        <input 
                          type="text" 
                          placeholder="Phone Number"
                          className="w-full border-[1px] text-[.9rem] border-gray-400 outline-none py-1 px-2 rounded-md"/>
                      </div>
                      <div className="flex flex-col w-[calc(98%/2)]">
                        <label 
                          htmlFor="country"
                          className="text-[.9rem]">
                          Select Country
                        </label>
                        <select 
                          id="country"
                          className="w-full border-[1px] text-[.9rem] border-gray-400 outline-none py-1 px-2 rounded-md">
                            <option value="">Select a country</option>
                            {countries.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="flex flex-col w-[calc(96%/3)] ">
                        <label 
                          htmlFor=""
                          className="text-[.9rem]">
                          City
                        </label>
                        <input 
                          type="text" 
                          placeholder="City"
                          className="w-full border-[1px] text-[.9rem] border-gray-400 outline-none py-1 px-2 rounded-md"/>
                      </div>
                      <div className="flex flex-col w-[calc(96%/3)] ">
                        <label 
                          htmlFor=""
                          className="text-[.9rem]">
                          State
                        </label>
                        <input 
                          type="text" 
                          placeholder="State"
                          className="w-full border-[1px] text-[.9rem] border-gray-400 outline-none py-1 px-2 rounded-md"/>
                      </div>
                      <div className="flex flex-col w-[calc(96.5%/3)] ">
                        <label 
                          htmlFor=""
                          className="text-[.9rem]">
                          ZIP Code
                        </label>
                        <input 
                          type="text" 
                          placeholder="ZIP Code"
                          className="w-full border-[1px] text-[.9rem] border-gray-400 outline-none py-1 px-2 rounded-md"/>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2 items-center">
                      <input type="checkbox" />
                      <span className="text-[.8rem]">I have read and agree to all Terms and Conditions.</span>
                    </div>
                    <div className="w-full flex items-end justify-end mt-4">
                      <button 
                        className="py-2 px-4 bg-blue-400 text-white rounded-md">
                        Purchase Now
                      </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
