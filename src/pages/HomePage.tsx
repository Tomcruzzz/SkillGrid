import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, CheckCircle, Users, Star, Scissors, Wrench, Car, Camera, Palette, Zap, Home, Music, GraduationCap, Laugh, Sparkles, Hotel, Utensils, Building } from 'lucide-react';
import { getServicesWithProviders, getProductsWithSellers, getVehiclesWithOwners, getCategories } from '../data/mockData';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');
  
  const services = getServicesWithProviders().slice(0, 3);
  const categories = getCategories();

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

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/browse?category=${categoryId}`);
  };

  // Service category icons mapping
  const getCategoryIcon = (categoryId: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'salon': <Scissors size={24} />,
      'cleaning': <Sparkles size={24} />,
      'appliance': <Wrench size={24} />,
      'auto': <Car size={24} />,
      'photography': <Camera size={24} />,
      'painting': <Palette size={24} />,
      'electrician': <Zap size={24} />,
      'plumbing': <Home size={24} />,
      'music': <Music size={24} />,
      'classes': <GraduationCap size={24} />,
      'comedy': <Laugh size={24} />,
      'programming': <Wrench size={24} />,
      'design': <Palette size={24} />,
      'writing': <GraduationCap size={24} />,
      'marketing': <Wrench size={24} />,
      'video': <Camera size={24} />,
      'audio': <Music size={24} />,
      'cooking': <Utensils size={24} />,
      'teaching': <GraduationCap size={24} />,
      'entertainment': <Laugh size={24} />,
      'hotels': <Hotel size={24} />,
      'other': <Building size={24} />,
    };
    return iconMap[categoryId] || <Wrench size={24} />;
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section - Dark like SkillGrid */}
      <section className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text and Search */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Find Local Services<br />
                  & Rentals Near You
                </h1>
                <p className="text-xl mb-8 text-gray-300">
                  Verified marketplace connecting you with real-world services and rentals in your area. Safe, secure, and location-based.
                </p>
                
                <div className="flex gap-4 mb-8">
                  <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Find Services
                  </button>
                  <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-gray-800 transition-colors">
                    List Your Service
                  </button>
                </div>
              </div>
              
              {/* Right side - Video placeholder */}
              <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                  </div>
                  <p className="text-gray-300">Marketplace Intro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section - White card like SkillGrid */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-center mb-6">What are you looking for?</h2>
              
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Service or rental"
                      className="w-full pl-4 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">Location</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories - Exactly like SkillGrid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Popular Categories</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {[
              { id: 'salon', label: 'Salon & Beauty', icon: <Scissors size={24} /> },
              { id: 'cleaning', label: 'Cleaning', icon: <Sparkles size={24} /> },
              { id: 'appliance', label: 'Appliance Repair', icon: <Wrench size={24} /> },
              { id: 'classes', label: 'Classes', icon: <GraduationCap size={24} /> },
              { id: 'music', label: 'Music Services', icon: <Music size={24} /> },
              { id: 'photography', label: 'Photography', icon: <Camera size={24} /> },
              { id: 'painting', label: 'Painting & Art', icon: <Palette size={24} /> },
              { id: 'electrician', label: 'Electrician', icon: <Zap size={24} /> },
              { id: 'auto', label: 'Auto Services', icon: <Car size={24} /> },
              { id: 'hotels', label: 'Hotels', icon: <Hotel size={24} /> },
              { id: 'comedy', label: 'Comedy Shows', icon: <Laugh size={24} /> },
              { id: 'cooking', label: 'Cooking', icon: <Utensils size={24} /> },
            ].map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer group hover:shadow-md"
              >
                <div className="w-12 h-12 mx-auto mb-3 p-3 rounded-full bg-gray-200 text-gray-600 group-hover:bg-teal-100 group-hover:text-teal-600 transition-colors duration-200">
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-900 text-sm leading-tight">
                  {category.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SkillGrid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SkillGrid?</h2>
            <p className="text-lg text-gray-600">
              Trusted, verified, and location-based marketplace
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <CheckCircle size={30} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-gray-600">
                All service providers are background checked and verified for your safety and peace of mind.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <Search size={30} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location-Based</h3>
              <p className="text-gray-600">
                Find services and rentals in your immediate area for convenience and quick access.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <Star size={30} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rated & Reviewed</h3>
              <p className="text-gray-600">
                Read genuine reviews and ratings from other customers to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Services</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service) => (
              <Link 
                key={service.id} 
                to={`/services/${service.id}`}
                className="group"
              >
                <div className="bg-gray-100 rounded-xl h-48 mb-4 overflow-hidden">
                  <img 
                    src={service.images[0]} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-medium mb-2 group-hover:text-teal-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;