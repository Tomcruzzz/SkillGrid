import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className="listing-card card card-hover h-full flex flex-col">
        <div className="relative h-48">
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className="badge badge-secondary">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
          </div>
          {product.condition && (
            <div className="absolute top-2 left-2">
              <span className="badge badge-success">
                {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
              </span>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="card-title text-lg font-medium mb-1 line-clamp-1">{product.title}</h3>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin size={14} className="mr-1" />
            <span>{product.location}</span>
          </div>
          
          <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg">
                ${product.price}
              </div>
              
              <div className="flex items-center">
                {product.seller && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      {product.seller.avatar ? (
                        <img 
                          src={product.seller.avatar} 
                          alt={product.seller.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                          {product.seller.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;