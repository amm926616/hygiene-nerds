import { Product } from "../types/Products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-200">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-52 object-cover mb-4 rounded-lg"
      />
      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
      <p className="text-gray-700 text-sm mb-4">{product.description}</p>
      <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2 px-6 rounded-full w-full font-medium transition-all duration-300 cursor-pointer">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
