import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Share2, Heart, Bookmark, ArrowLeft } from 'lucide-react';
import { getProductsWithSellers } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const products = getProductsWithSellers();
  const product = products.find((p) => p.id === id);
  const { isAuthenticated } = useAuth();
  
  const [showContactInfo, setShowContactInfo] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/browse?type=products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/browse?type=products" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to products
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="relative h-96">
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-teal-600 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-teal-600 transition-colors">
                  <Share2 size={20} />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-teal-600 transition-colors">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-wrap items-start justify-between mb-4">
              <div>
                <span className="badge badge-secondary mb-2">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
                <h1 className="text-3xl font-bold">{product.title}</h1>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span>{product.location}</span>
              </div>
              
              {product.condition && (
                <>
                  <div className="mx-3 text-gray-300">|</div>
                  <span className="badge badge-success">
                    {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)} Condition
                  </span>
                </>
              )}
            </div>
            
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xl font-semibold mb-4">About This Product</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Contact Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-24">
            {showContactInfo && isAuthenticated ? (
              <div className="text-center py-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <p className="text-gray-600 mb-2">
                  You can contact the seller directly:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="font-medium">Email:</p>
                  <p className="text-teal-600">{product.seller?.email}</p>
                </div>
                <button 
                  onClick={() => setShowContactInfo(false)}
                  className="btn btn-outline w-full"
                >
                  Hide Contact Info
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Interested in this product?</h2>
                
                {isAuthenticated ? (
                  <button 
                    onClick={() => setShowContactInfo(true)}
                    className="btn btn-primary w-full mb-4"
                  >
                    Show Contact Info
                  </button>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-4">
                      Please sign in to contact the seller
                    </p>
                    <Link to="/login" className="btn btn-primary w-full mb-2">
                      Sign In
                    </Link>
                    <Link to="/register" className="btn btn-outline w-full">
                      Create Account
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Seller Card */}
          {product.seller && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About the Seller</h2>
              
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  {product.seller.avatar ? (
                    <img 
                      src={product.seller.avatar} 
                      alt={product.seller.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
                      {product.seller.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{product.seller.name}</h3>
                  <p className="text-gray-600">Member since {new Date(product.seller.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                {product.seller.bio || 'Trusted seller in our marketplace community.'}
              </p>
              
              {product.seller.skills && product.seller.skills.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.seller.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {!showContactInfo && isAuthenticated && (
                <button 
                  onClick={() => setShowContactInfo(true)}
                  className="btn btn-outline w-full"
                >
                  Contact Seller
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;