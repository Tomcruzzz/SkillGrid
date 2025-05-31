import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, MessageSquare, CheckCircle, Share2, Heart, Bookmark, ArrowLeft } from 'lucide-react';
import { getServicesWithProviders, getUserById } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const services = getServicesWithProviders();
  const service = services.find((s) => s.id === id);
  const { isAuthenticated, currentUser } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  
  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        <p className="mb-8">The service you're looking for doesn't exist or has been removed.</p>
        <Link to="/browse" className="btn btn-primary">
          Browse Services
        </Link>
      </div>
    );
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the booking request to the server
    setShowThankYou(true);
  };

  // Generate available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  // Generate available time slots
  const availableTimeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/browse" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to services
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="relative h-96">
              <img 
                src={service.images[0]} 
                alt={service.title} 
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
          
          {/* Service Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-wrap items-start justify-between mb-4">
              <div>
                <span className="badge badge-primary mb-2">
                  {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                </span>
                <h1 className="text-3xl font-bold">{service.title}</h1>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${service.price}{service.priceType === 'hourly' ? '/hr' : service.priceType === 'daily' ? '/day' : ''}
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center text-amber-500 mr-2">
                <Star size={20} className="fill-current" />
                <span className="ml-1 font-semibold text-gray-900">{service.rating}</span>
              </div>
              <span className="text-gray-600">({service.reviewCount} reviews)</span>
              
              <div className="mx-3 text-gray-300">|</div>
              
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span>{service.location}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xl font-semibold mb-4">About This Service</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-teal-100 rounded-full p-2 mr-3">
                    <Clock size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Service Duration</h3>
                    <p className="text-gray-600">{service.priceType === 'hourly' ? 'Hourly rate' : service.priceType === 'daily' ? 'Daily rate' : 'Fixed price'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal-100 rounded-full p-2 mr-3">
                    <Calendar size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Availability</h3>
                    <p className="text-gray-600">Monday to Friday, 9 AM - 5 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <div className="flex items-center">
                <div className="flex items-center text-amber-500 mr-2">
                  <Star size={20} className="fill-current" />
                  <span className="ml-1 font-semibold text-gray-900">{service.rating}</span>
                </div>
                <span className="text-gray-600">({service.reviewCount} reviews)</span>
              </div>
            </div>
            
            {/* Sample reviews */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" 
                      alt="Reviewer" 
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
                  Amazing service! Very professional and delivered exactly what I needed on time.
                  I would definitely recommend to anyone looking for quality work.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" 
                      alt="Reviewer" 
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
                  Great experience working with this provider. Communication was clear and the work was completed to my satisfaction.
                  The only reason for 4 stars is that it took a bit longer than initially estimated.
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-teal-600 font-medium hover:text-teal-700">
                See all {service.reviewCount} reviews
              </button>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Booking Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-24">
            {showThankYou ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-4">
                  Your booking request has been sent. The service provider will contact you shortly.
                </p>
                <button 
                  onClick={() => setShowThankYou(false)}
                  className="btn btn-outline w-full"
                >
                  Book Another Time
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Book This Service</h2>
                
                {isAuthenticated ? (
                  <form onSubmit={handleBooking}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Date
                      </label>
                      <select
                        className="select"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                      >
                        <option value="">Choose a date</option>
                        {availableDates.map((date) => (
                          <option key={date} value={date}>
                            {new Date(date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Time
                      </label>
                      <select
                        className="select"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                      >
                        <option value="">Choose a time</option>
                        {availableTimeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message (Optional)
                      </label>
                      <textarea
                        className="input"
                        rows={3}
                        placeholder="Tell the provider about your specific needs..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <span>Service Rate</span>
                        <span>${service.price}{service.priceType === 'hourly' ? '/hr' : service.priceType === 'daily' ? '/day' : ''}</span>
                      </div>
                      {service.priceType === 'hourly' && (
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                          <span>Estimated (3 hours)</span>
                          <span>${service.price * 3}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold mt-2">
                        <span>Total (estimated)</span>
                        <span>${service.priceType === 'hourly' ? service.price * 3 : service.price}</span>
                      </div>
                    </div>
                    
                    <button 
                      type="submit"
                      className="btn btn-primary w-full"
                    >
                      Request Booking
                    </button>
                    
                    <div className="text-center mt-4 text-sm text-gray-500">
                      You won't be charged yet
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-4">
                      Please sign in to book this service
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
          
          {/* Provider Card */}
          {service.provider && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About the Provider</h2>
              
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
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
                <div>
                  <h3 className="font-semibold text-lg">{service.provider.name}</h3>
                  <p className="text-gray-600">Member since {new Date(service.provider.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                </div>
                {service.provider.isVerified && (
                  <div className="ml-auto">
                    <div className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <CheckCircle size={12} className="mr-1" />
                      Verified
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-gray-700 mb-4">
                {service.provider.bio || 'Professional service provider with expertise in this field.'}
              </p>
              
              {service.provider.skills && service.provider.skills.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.provider.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <button className="btn btn-outline w-full flex items-center justify-center">
                <MessageSquare size={16} className="mr-2" />
                Contact Provider
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;