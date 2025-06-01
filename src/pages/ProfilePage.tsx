import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getServicesWithProviders, getProductsWithSellers, getVehiclesWithOwners } from '../data/mockData';
import { Settings, Edit, MessageSquare, Star, MapPin } from 'lucide-react';
import ServiceCard from '../components/common/ServiceCard';
import ProductCard from '../components/common/ProductCard';
import VehicleCard from '../components/common/VehicleCard';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews' | 'settings'>('listings');
  const [listingType, setListingType] = useState<'services' | 'products' | 'vehicles'>('services');

  // Get user's listings
  const services = getServicesWithProviders().filter(s => s.providerId === currentUser?.id);
  const products = getProductsWithSellers().filter(p => p.sellerId === currentUser?.id);
  const vehicles = getVehiclesWithOwners().filter(v => v.ownerId === currentUser?.id);

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            {currentUser.avatar ? (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl font-semibold">
                {currentUser.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{currentUser.name}</h1>
              {currentUser.isVerified && (
                <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
            
            {currentUser.location && (
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin size={16} className="mr-1" />
                <span>{currentUser.location}</span>
              </div>
            )}
            
            <p className="text-gray-600 mb-4">
              {currentUser.bio || 'No bio provided yet'}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-outline btn-sm">
                <Edit size={16} className="mr-1" />
                Edit Profile
              </button>
              <button className="btn btn-outline btn-sm">
                <MessageSquare size={16} className="mr-1" />
                Messages
              </button>
              <button className="btn btn-outline btn-sm">
                <Settings size={16} className="mr-1" />
                Settings
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2 ml-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.9</div>
              <div className="flex items-center text-amber-500">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
              </div>
              <div className="text-sm text-gray-500">15 reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-4 px-1 relative font-medium text-sm ${
              activeTab === 'listings'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Listings
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-1 relative font-medium text-sm ${
              activeTab === 'reviews'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-1 relative font-medium text-sm ${
              activeTab === 'settings'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Listings Tab */}
      {activeTab === 'listings' && (
        <div>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setListingType('services')}
              className={`px-4 py-2 rounded-lg font-medium ${
                listingType === 'services'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Services ({services.length})
            </button>
            <button
              onClick={() => setListingType('products')}
              className={`px-4 py-2 rounded-lg font-medium ${
                listingType === 'products'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setListingType('vehicles')}
              className={`px-4 py-2 rounded-lg font-medium ${
                listingType === 'vehicles'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Vehicles ({vehicles.length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listingType === 'services' && services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
            
            {listingType === 'products' && products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {listingType === 'vehicles' && vehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
            
            {((listingType === 'services' && services.length === 0) ||
              (listingType === 'products' && products.length === 0) ||
              (listingType === 'vehicles' && vehicles.length === 0)) && (
              <div className="col-span-2 text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {listingType} yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Start creating your first listing to showcase your offerings.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Sarah" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">Sarah Johnson</h4>
                <p className="text-gray-500 text-sm">2 weeks ago</p>
              </div>
              <div className="ml-auto flex items-center text-amber-500">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
              </div>
            </div>
            <p className="text-gray-700">
              Excellent service! Very professional and delivered exactly what I needed.
              Would definitely recommend and use again.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Michael" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">Michael Thompson</h4>
                <p className="text-gray-500 text-sm">1 month ago</p>
              </div>
              <div className="ml-auto flex items-center text-amber-500">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="text-gray-300" />
              </div>
            </div>
            <p className="text-gray-700">
              Great experience overall. Communication was clear and the work was completed
              to my satisfaction. The only reason for 4 stars is that it took a bit longer
              than initially estimated.
            </p>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue={currentUser.name}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input"
                    defaultValue={currentUser.email}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    className="input"
                    rows={4}
                    defaultValue={currentUser.bio}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue={currentUser.location}
                  />
                </div>
                
                <div className="pt-4">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="input"
                  />
                </div>
                
                <div className="pt-4">
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-500">
                      Receive emails about your account activity
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">
                      Receive text messages for important updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Communications</h4>
                    <p className="text-sm text-gray-500">
                      Receive updates about new features and promotions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <button className="btn btn-outline text-red-600 border-red-600 hover:bg-red-50">
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;