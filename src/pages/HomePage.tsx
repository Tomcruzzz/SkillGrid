import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, CheckCircle, MessageSquare, Star, ArrowRight } from 'lucide-react';
import { getServicesWithProviders, getProductsWithSellers, getVehiclesWithOwners } from '../data/mockData';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');
  
  const services = getServicesWithProviders().slice(0, 4);
  const products = getProductsWithSellers().slice(0, 2);
  const vehicles = getVehiclesWithOwners().slice(0, 2);

  const locations = [
    'San Francisco, CA',
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Seattle, WA'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.append('q', searchQuery);
    }
    if (selectedLocation) {
      params.append('location', selectedLocation);
    }
    
    navigate(`/browse?${params.toString()}`);
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Find Services & Products <br />
              from Verified Providers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Connect with skilled professionals and quality products in your area
            </p>
            
            <form onSubmit={handleSearch} className="bg-white p-2 md:p-3 rounded-lg shadow-lg flex flex-col md:flex-row">
              <div className="flex-1 mb-2 md:mb-0 md:mr-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What service are you looking for?"
                    className="w-full pl-10 pr-3 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div className="flex-1 mb-2 md:mb-0 md:mr-2">
                <select
                  className="w-full px-3 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Search
              </button>
            </form>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg shadow">
              <p className="text-3xl font-bold">500+</p>
              <p>Verified Providers</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg shadow">
              <p className="text-3xl font-bold">1000+</p>
              <p>Service Listings</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg shadow">
              <p className="text-3xl font-bold">50+</p>
              <p>Categories</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg shadow">
              <p className="text-3xl font-bold">98%</p>
              <p>Satisfied Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Featured Services</h2>
            <Link to="/browse" className="text-teal-600 hover:text-teal-700 flex items-center font-medium">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link 
                key={service.id} 
                to={`/services/${service.id}`}
                className="group"
              >
                <div className="card card-hover h-full flex flex-col">
                  <div className="relative h-48">
                    <img 
                      src={service.images[0]} 
                      alt={service.title} 
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="badge badge-primary">
                        {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-medium mb-2 group-hover:text-teal-600 transition-colors">{service.title}</h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-amber-500">
                        <Star size={16} className="fill-current" />
                      </div>
                      <span className="font-medium ml-1">{service.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({service.reviewCount} reviews)</span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                    
                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="font-bold text-gray-900">
                        ${service.price}{service.priceType === 'hourly' ? '/hr' : service.priceType === 'daily' ? '/day' : ''}
                      </div>
                      
                      {service.provider && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            {service.provider.avatar ? (
                              <img 
                                src={service.provider.avatar} 
                                alt={service.provider.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
                                {service.provider.name.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with verified service providers and shop quality products in just a few steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                <Search size={30} className="text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-gray-600">
                Discover services, products, and rentals based on your location and preferences
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                <MessageSquare size={30} className="text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Message service providers, discuss your requirements, and get quotes
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                <CheckCircle size={30} className="text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Pay</h3>
              <p className="text-gray-600">
                Book services, purchase products, or rent vehicles with secure payment options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products & Rentals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Products */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quality Products</h2>
                <Link to="/browse?type=products" className="text-teal-600 hover:text-teal-700 flex items-center font-medium">
                  View All <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <Link 
                    key={product.id} 
                    to={`/products/${product.id}`}
                    className="group"
                  >
                    <div className="card card-hover flex">
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                        <img 
                          src={product.images[0]} 
                          alt={product.title} 
                          className="w-full h-full object-cover rounded-l-xl"
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-medium group-hover:text-teal-600 transition-colors">{product.title}</h3>
                            <span className="badge badge-secondary ml-2">
                              {product.condition}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-1 mt-1">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="font-bold">${product.price}</div>
                          <div className="text-sm text-gray-500">{product.location}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Rentals */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Vehicle Rentals</h2>
                <Link to="/browse?type=vehicles" className="text-teal-600 hover:text-teal-700 flex items-center font-medium">
                  View All <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {vehicles.map((vehicle) => (
                  <Link 
                    key={vehicle.id} 
                    to={`/vehicles/${vehicle.id}`}
                    className="group"
                  >
                    <div className="card card-hover flex">
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                        <img 
                          src={vehicle.images[0]} 
                          alt={`${vehicle.make} ${vehicle.model}`} 
                          className="w-full h-full object-cover rounded-l-xl"
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-medium group-hover:text-teal-600 transition-colors">
                              {vehicle.make} {vehicle.model}
                            </h3>
                            <span className="badge badge-secondary ml-2">
                              {vehicle.type}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{vehicle.year} · {vehicle.location}</p>
                        </div>
                        <div className="font-bold mt-2">
                          ${vehicle.price}{vehicle.priceType === 'hourly' ? '/hr' : '/day'}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Service to Offer?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of verified service providers and reach thousands of potential clients
          </p>
          <Link 
            to="/register" 
            className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium text-lg inline-block transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;