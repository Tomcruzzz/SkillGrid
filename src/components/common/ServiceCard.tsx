import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link to={`/services/${service.id}`} className="block">
      <div className="listing-card card card-hover h-full flex flex-col">
        <div className="relative h-48">
          <img 
            src={service.images[0]} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className="badge badge-primary">
              {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="card-title text-lg font-medium mb-1 line-clamp-1">{service.title}</h3>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin size={14} className="mr-1" />
            <span>{service.location}</span>
          </div>
          
          <p className="text-gray-600 mb-3 line-clamp-2">{service.description}</p>
          
          <div className="mt-auto">
            <div className="flex items-center mb-2">
              <div className="flex items-center text-amber-500 mr-1">
                <Star size={16} className="fill-current" />
              </div>
              <span className="font-medium">{service.rating}</span>
              <span className="text-gray-500 text-sm ml-1">({service.reviewCount} reviews)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg">
                ${service.price}{service.priceType === 'hourly' ? '/hr' : service.priceType === 'daily' ? '/day' : ''}
              </div>
              
              <div className="flex items-center">
                {service.provider && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      {service.provider.avatar ? (
                        <img 
                          src={service.provider.avatar} 
                          alt={service.provider.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                          {service.provider.name.charAt(0)}
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

export default ServiceCard;