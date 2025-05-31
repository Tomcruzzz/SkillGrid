import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, MapPin, ChevronDown } from 'lucide-react';
import ServiceCard from '../components/common/ServiceCard';
import ProductCard from '../components/common/ProductCard';
import VehicleCard from '../components/common/VehicleCard';
import { getServicesWithProviders, getProductsWithSellers, getVehiclesWithOwners, getCategories } from '../data/mockData';
import { Service, Product, Vehicle, Category } from '../types';

const BrowsePage: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [listingType, setListingType] = useState<'services' | 'products' | 'vehicles'>('services');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);

  const services = getServicesWithProviders();
  const products = getProductsWithSellers();
  const vehicles = getVehiclesWithOwners();
  const categories = getCategories();

  const locations = [
    'San Francisco, CA',
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Seattle, WA'
  ];

  // Parse URL query params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const loc = params.get('location');
    const type = params.get('type');
    const cat = params.get('category');
    
    if (q) setSearchQuery(q);
    if (loc) setSelectedLocation(loc);
    if (type === 'products') setListingType('products');
    if (type === 'vehicles') setListingType('vehicles');
    if (cat) setSelectedCategories([cat as Category]);
    
    // Apply initial filters
    applyFilters();
  }, [location.search]);

  // Apply filters when filter state changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedLocation, selectedCategories, minPrice, maxPrice, listingType]);

  const applyFilters = () => {
    // Filter services
    let filteredServicesResult = services;
    if (searchQuery) {
      filteredServicesResult = filteredServicesResult.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedLocation) {
      filteredServicesResult = filteredServicesResult.filter(service => 
        service.location === selectedLocation
      );
    }
    if (selectedCategories.length > 0) {
      filteredServicesResult = filteredServicesResult.filter(service => 
        selectedCategories.includes(service.category)
      );
    }
    if (minPrice) {
      filteredServicesResult = filteredServicesResult.filter(service => 
        service.price >= parseInt(minPrice)
      );
    }
    if (maxPrice) {
      filteredServicesResult = filteredServicesResult.filter(service => 
        service.price <= parseInt(maxPrice)
      );
    }
    setFilteredServices(filteredServicesResult);

    // Filter products
    let filteredProductsResult = products;
    if (searchQuery) {
      filteredProductsResult = filteredProductsResult.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedLocation) {
      filteredProductsResult = filteredProductsResult.filter(product => 
        product.location === selectedLocation
      );
    }
    if (selectedCategories.length > 0) {
      filteredProductsResult = filteredProductsResult.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    if (minPrice) {
      filteredProductsResult = filteredProductsResult.filter(product => 
        product.price >= parseInt(minPrice)
      );
    }
    if (maxPrice) {
      filteredProductsResult = filteredProductsResult.filter(product => 
        product.price <= parseInt(maxPrice)
      );
    }
    setFilteredProducts(filteredProductsResult);

    // Filter vehicles
    let filteredVehiclesResult = vehicles;
    if (searchQuery) {
      filteredVehiclesResult = filteredVehiclesResult.filter(vehicle => 
        `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedLocation) {
      filteredVehiclesResult = filteredVehiclesResult.filter(vehicle => 
        vehicle.location === selectedLocation
      );
    }
    if (minPrice) {
      filteredVehiclesResult = filteredVehiclesResult.filter(vehicle => 
        vehicle.price >= parseInt(minPrice)
      );
    }
    if (maxPrice) {
      filteredVehiclesResult = filteredVehiclesResult.filter(vehicle => 
        vehicle.price <= parseInt(maxPrice)
      );
    }
    setFilteredVehicles(filteredVehiclesResult);
  };

  const handleCategoryToggle = (category: Category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Listings</h1>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setListingType('services')}
            className={`px-4 py-2 rounded-lg font-medium ${
              listingType === 'services' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Services
          </button>
          <button 
            onClick={() => setListingType('products')}
            className={`px-4 py-2 rounded-lg font-medium ${
              listingType === 'products' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Products
          </button>
          <button 
            onClick={() => setListingType('vehicles')}
            className={`px-4 py-2 rounded-lg font-medium ${
              listingType === 'vehicles' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Vehicles
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 gap-6">
        {/* Filters - desktop */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm p-6 h-fit">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Location</h3>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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

          {listingType === 'services' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-gray-700"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Price Range</h3>
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Min"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Max"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Clear Filters
          </button>
        </div>

        {/* Mobile filters button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <Filter size={16} className="mr-2" />
              <span>Filters</span>
            </div>
            <ChevronDown
              size={16}
              className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Mobile filters dropdown */}
          {isFilterOpen && (
            <div className="mt-2 p-4 bg-white rounded-lg shadow-sm">
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search listings..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Location</h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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

              {listingType === 'services' && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.slice(0, 6).map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryToggle(category.id)}
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <label
                          htmlFor={`mobile-category-${category.id}`}
                          className="ml-2 text-gray-700 text-sm"
                        >
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Price Range</h3>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Listings */}
        <div className="lg:col-span-3">
          {/* Active filters */}
          {(searchQuery || selectedLocation || selectedCategories.length > 0 || minPrice || maxPrice) && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <span>"{searchQuery}"</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-teal-800"
                    >
                      &times;
                    </button>
                  </div>
                )}
                
                {selectedLocation && (
                  <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span>{selectedLocation}</span>
                    <button
                      onClick={() => setSelectedLocation('')}
                      className="ml-2 text-teal-800"
                    >
                      &times;
                    </button>
                  </div>
                )}
                
                {selectedCategories.map(category => {
                  const categoryLabel = categories.find(c => c.id === category)?.label;
                  return (
                    <div key={category} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center">
                      <span>{categoryLabel}</span>
                      <button
                        onClick={() => handleCategoryToggle(category)}
                        className="ml-2 text-teal-800"
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
                
                {(minPrice || maxPrice) && (
                  <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <span>
                      {minPrice && !maxPrice 
                        ? `$${minPrice}+` 
                        : !minPrice && maxPrice 
                        ? `Up to $${maxPrice}`
                        : `$${minPrice} - $${maxPrice}`}
                    </span>
                    <button
                      onClick={() => {
                        setMinPrice('');
                        setMaxPrice('');
                      }}
                      className="ml-2 text-teal-800"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Listing results */}
          {listingType === 'services' && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Services 
                <span className="text-gray-500 ml-2 text-lg font-normal">
                  ({filteredServices.length} results)
                </span>
              </h2>
              
              {filteredServices.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500 mb-4">No services found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServices.map(service => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              )}
            </>
          )}

          {listingType === 'products' && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Products 
                <span className="text-gray-500 ml-2 text-lg font-normal">
                  ({filteredProducts.length} results)
                </span>
              </h2>
              
              {filteredProducts.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}

          {listingType === 'vehicles' && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Vehicles 
                <span className="text-gray-500 ml-2 text-lg font-normal">
                  ({filteredVehicles.length} results)
                </span>
              </h2>
              
              {filteredVehicles.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500 mb-4">No vehicles found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredVehicles.map(vehicle => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;