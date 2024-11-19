import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const Products = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [activeIndexStatus, setActiveIndexStatus] = useState<number | null>(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterButton = [
    { label: "All", clickFunc: () => setFilteredProducts(products) },
    { label: "Sofa", clickFunc: () => filterByType("sofa") },
    { label: "Chair", clickFunc: () => filterByType("chair") },
    { label: "Lamp", clickFunc: () => filterByType("lamp") },
  ];

  const filterButtonByStatus = [
    { label: "New Arrival", clickFunc: () => filterByStatus("New Arrival") },
    { label: "Best Seller", clickFunc: () => filterByStatus("Best Seller") },
    { label: "Featured", clickFunc: () => filterByStatus("Featured") },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all products
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterByType = (type: string) => {
    setFilteredProducts(products.filter((product) => product.type === type));
  };

  const filterByStatus = (status: string) => {
    setFilteredProducts(products.filter((product) => product.status === status));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[90%] flex items-start border-b-[1px] mt-3 gap-6 border-gray-200">
        <div className="flex flex-col items-start justify-start">
          <div className="w-[90%] ">
            <h3 className="font-semibold">Filters by Type</h3>
          </div>
          <div className="flex gap-3 *:py-1 *:px-4 *:rounded-md py-2">
            {filterButton.map((button, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  button.clickFunc();
                }}
                className={`capitalize border-[1px] border-gray-200 ${
                  activeIndex === index ? "bg-blue-300 text-white" : "bg-white text-black"
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-start">
          <div className="w-[90%] ">
            <h3 className="font-semibold">Filters by Status</h3>
          </div>
          <div className="flex gap-3 *:py-1 *:px-4 *:rounded-md py-2">
            {filterButtonByStatus.map((button, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndexStatus(index);
                  button.clickFunc();
                }}
                className={`capitalize border-[1px] border-gray-200 ${
                  activeIndexStatus === index ? "bg-blue-300 text-white" : ""
                }`}>
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[90%] grid grid-cols-4 gap-3 mt-3 ">
      {filteredProducts.map((product) => (
        <Link 
          to={`/products/${product.id}`} 
          key={product.id} 
          className="w-full h-fit flex flex-col border-[1px] relative border-gray-200 rounded-md overflow-hidden">
          <div className="w-full h-[250px] overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-center hover:scale-110 transition-all ease-in-out"
            />
          </div>
          <div className="p-2">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-[.9rem] font-semibold">
              Price: $<span className="text-red-500 font-normal">{product.price}</span>
            </p>
          </div>
          {product.status === "New Arrival" && 
          (
            <span className="absolute top-1 right-1 text-[.8rem] bg-red-400 text-white rounded py-1 px-2 ">
              New Arrival
            </span>
          )}
        </Link>
      ))}
      </div>
    </div>
  );
};

export default Products;
