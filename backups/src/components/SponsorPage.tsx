import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Mail, Phone, Calendar, ArrowLeft } from 'lucide-react';
import { Sponsor } from '../types';
import { fetchSponsors } from '../utils/airtable';

const SponsorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSponsor = async () => {
      const sponsors = await fetchSponsors();
      const foundSponsor = sponsors.find((s: Sponsor) => s.id === id);
      setSponsor(foundSponsor || null);
      setLoading(false);
    };
    loadSponsor();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading sponsor details...</div>;
  }

  if (!sponsor) {
    return <div>Sponsor not found</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Link to="/" className="flex items-center text-blue-600 hover:underline mb-4">
        <ArrowLeft size={20} className="mr-2" />
        Back to Sponsors List
      </Link>
      <div className="flex items-center mb-6">
        <img className="h-24 w-24 rounded-full mr-6" src={Array.isArray(sponsor.logo) && sponsor.logo.length > 0 ? sponsor.logo[0].url : ''} alt={sponsor.name} />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{sponsor.name}</h2>
          <p className="text-xl text-gray-600">{sponsor.industry}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
          <p className="text-lg font-medium text-gray-700">{sponsor.contactPerson}</p>
          <div className="flex items-center mt-2">
            <Mail size={20} className="mr-2 text-gray-500" />
            <a href={`mailto:${sponsor.email}`} className="text-blue-600 hover:underline">{sponsor.email}</a>
          </div>
          <div className="flex items-center mt-2">
            <Phone size={20} className="mr-2 text-gray-500" />
            <a href={`tel:${sponsor.phone}`} className="text-blue-600 hover:underline">{sponsor.phone}</a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Sponsorship Details</h3>
          <div className="flex items-center mt-2">
            <Calendar size={20} className="mr-2 text-gray-500" />
            <p className="text-lg text-gray-700">{sponsor.contractEndDate}</p>
          </div>
          <div className="mt-2">
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800`}>
              {sponsor.sponsorshipLevel} Sponsor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorPage;