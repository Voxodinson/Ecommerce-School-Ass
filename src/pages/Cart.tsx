import { useEffect, useState } from "react";

interface ICartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

          {/* Summary Section */}
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
              <button className="bg-blue-400 py-2 items-end w-full rounded-md text-white mt-3">
                    Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
