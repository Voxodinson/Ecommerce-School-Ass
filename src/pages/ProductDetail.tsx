import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState(1); // Initial quantity set to 1
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!product) return;

    try {
      const response = await fetch("http://localhost:5000/cartItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image_url,
          quantity, // Include the selected quantity
        }),
      });

      if (!response.ok) throw new Error("Failed to add item to cart");

      setSuccessMessage("Item added to cart successfully!");
      setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1); // Increase quantity
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Decrease quantity, ensuring it doesn't drop below 1

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return product ? (
    <div className="w-full flex items-center justify-center py-10">
      <div className="w-[90%] h-[72vh] flex items-center gap-6 justify-start">
        <div className="flex items-start justify-start gap-6">
          <div className="w-[500px] relative h-[500px] bg-slate-200 rounded-md overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-center"
            />
            {product.status === "New Arrival" && (
              <span className="absolute top-1 right-1 text-[.8rem] bg-red-400 text-white rounded py-1 px-2">
                New Arrival
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-[1.2rem]">{product.name}</h3>
            <span>
              Rating: &nbsp;
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={index < product.rating ? "text-yellow-400" : "text-gray-300"}>
                  &#9733;
                </span>
              ))}
            </span>
            <span>
              Price: <span className="text-red-500">${product.price}</span>
            </span>
            <p>{product.description}</p>
            <div className="flex items-center gap-4">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button
              onClick={addToCart}
              className="py-1 px-4 rounded-md bg-blue-300 w-[200px] text-white"
            >
              Add to cart
            </button>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Product not found</div>
  );
};

export default ProductDetail;
