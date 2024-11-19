import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  isNewArrival: boolean;
  status?: string; // Optional, if not all products have a status
}

const NewArrival = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]); // Typed state for new arrivals
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch data from an API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: Product[] = await response.json(); 
      

        // Filter products marked as new arrivals
        const filteredNewArrivals = data.filter((product) => product.status === 'New Arrival');
        setNewArrivals(filteredNewArrivals);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading new arrivals...</div>;
  }

  return (
    <div className="p-4 w-full flex flex-col items-center justify-center">
      <div className="border-b border-gray-400 flex items-start w-[90%] mb-3">
        <h1 className="font-semibold mb-4">New Arrivals</h1>
      </div>
      <div className="w-[90%] grid grid-cols-1 md:grid-cols-4 gap-3">
        {newArrivals.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="w-full flex flex-col border border-gray-200 rounded-md overflow-hidden relative"
          >
            <div className="w-full h-[250px] overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-center hover:scale-110 transition-transform duration-300 ease-in-out"
              />
            </div>
            <div className="p-2">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm font-semibold">
                Price: <span className="text-red-500 font-normal">${product.price}</span>
              </p>
            </div>
            {product.status === 'New Arrival' && (
              <span className="absolute top-2 right-2 text-xs bg-red-500 text-white rounded px-2 py-1">
                New Arrival
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
