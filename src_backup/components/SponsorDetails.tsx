import React from 'react';
import { Sponsor } from '../types';
import { X, Mail, Phone, Calendar } from 'lucide-react';

interface SponsorDetailsProps {
  sponsor: Sponsor;
  onClose: () => void;
}

const SponsorDetails: React.FC<SponsorDetailsProps> = ({ sponsor, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{sponsor.name}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X size={24} />
            </button>
          </div>
          <div className="mt-2 px-7 py-3">
            <img className="h-20 w-20 rounded-full mx-auto" src={typeof sponsor.logo === 'string' ? sponsor.logo : ''} alt={sponsor.name} />
            <p className="text-sm text-gray-500 mt-1">{sponsor.industry}</p>
            <div className="mt-4 text-sm text-gray-500">
              <p className="font-semibold">{sponsor.contactPerson}</p>
              <div className="flex items-center justify-center mt-2">
                <Mail size={16} className="mr-2" />
                <a href={`mailto:${sponsor.email}`} className="text-blue-500 hover:underline">{sponsor.email}</a>
              </div>
              <div className="flex items-center justify-center mt-1">
                <Phone size={16} className="mr-2" />
                <a href={`tel:${sponsor.phone}`} className="text-blue-500 hover:underline">{sponsor.phone}</a>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700">Sponsorship Details</p>
              <div className="flex items-center justify-center mt-1">
                <Calendar size={16} className="mr-2" />
                <p className="text-sm text-gray-500">Contract End: {sponsor.contractEndDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorDetails;