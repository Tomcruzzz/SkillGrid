import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { Vehicle } from '../../types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <Link to={`/vehicles/${vehicle.id}`} className="block">
      <div className="listing-card card card-hover h-full flex flex-col">
        <div className="relative h-48">
          <img 
            src={vehicle.images[0]} 
            alt={`${vehicle.make} ${vehicle.model}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className="badge badge-secondary">
              {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="card-title text-lg font-medium mb-1 line-clamp-1">
            {vehicle.make} {vehicle.model}
          </h3>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin size={14} className="mr-1" />
            <span>{vehicle.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Calendar size={14} className="mr-1" />
            <span>{vehicle.year}</span>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg">
                ${vehicle.price}{vehicle.priceType === 'hourly' ? '/hr' : '/day'}
              </div>
              
              <div className="flex items-center">
                {vehicle.owner && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      {vehicle.owner.avatar ? (
                        <img 
                          src={vehicle.owner.avatar} 
                          alt={vehicle.owner.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                          {vehicle.owner.name.charAt(0)}
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

export default VehicleCard;