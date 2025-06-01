import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload } from 'lucide-react';
import { Category, getCategories } from '../data/mockData';

const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState<'service' | 'product' | 'vehicle'>('service');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('other');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState<'hourly' | 'fixed' | 'daily'>('fixed');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState<'new' | 'like-new' | 'good' | 'fair' | 'poor'>('new');
  const [vehicleType, setVehicleType] = useState<'car' | 'bike' | 'scooter' | 'taxi'>('car');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const categories = getCategories();
  const locations = [
    'San Francisco, CA',
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Seattle, WA'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to the server
    // For demo, we'll just redirect to the browse page
    navigate('/browse');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a New Listing</h1>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Listing Type
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setListingType('service')}
                className={`p-4 rounded-lg border-2 text-center transition-colors ${
                  listingType === 'service'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Service
              </button>
              <button
                type="button"
                onClick={() => setListingType('product')}
                className={`p-4 rounded-lg border-2 text-center transition-colors ${
                  listingType === 'product'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Product
              </button>
              <button
                type="button"
                onClick={() => setListingType('vehicle')}
                className={`p-4 rounded-lg border-2 text-center transition-colors ${
                  listingType === 'vehicle'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Vehicle
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {listingType === 'service' && (
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  className="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {listingType === 'vehicle' && (
              <>
                <div>
                  <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    id="vehicleType"
                    className="select"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as 'car' | 'bike' | 'scooter' | 'taxi')}
                    required
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="scooter">Scooter</option>
                    <option value="taxi">Taxi</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <input
                      type="text"
                      id="make"
                      className="input"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      id="model"
                      className="input"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      id="year"
                      className="input"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {listingType === 'product' && (
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  id="condition"
                  className="select"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as 'new' | 'like-new' | 'good' | 'fair' | 'poor')}
                  required
                >
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    id="price"
                    className="input pl-7"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {(listingType === 'service' || listingType === 'vehicle') && (
                <div>
                  <label htmlFor="priceType" className="block text-sm font-medium text-gray-700 mb-1">
                    Price Type
                  </label>
                  <select
                    id="priceType"
                    className="select"
                    value={priceType}
                    onChange={(e) => setPriceType(e.target.value as 'hourly' | 'fixed' | 'daily')}
                    required
                  >
                    <option value="fixed">Fixed Price</option>
                    <option value="hourly">Per Hour</option>
                    <option value="daily">Per Day</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                id="location"
                className="select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option value="">Select a location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 transition-colors"
                  >
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <div className="text-sm text-gray-500">Add Photo</div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Upload up to 3 images. First image will be the cover photo.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;