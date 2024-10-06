import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
      <Link to="/" className="flex items-center text-blue-600 hover:underline mb-4">
        <ArrowLeft size={20} className="mr-2" />
        Back to Sponsors List
      </Link>
      <div className="flex flex-col md:flex-row items-center mb-6">
        <img className="h-24 w-24 rounded-full mb-4 md:mb-0 md:mr-6" src={Array.isArray(sponsor.logo) && sponsor.logo.length > 0 ? sponsor.logo[0] : ''} alt={sponsor.name} />
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{sponsor.name}</h2>
          <p className="text-lg md:text-xl text-gray-600">{sponsor.industry}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
          <p className="text-gray-700"><strong>Contact Person:</strong> {sponsor.contactPerson}</p>
          <p className="text-gray-700"><strong>Email:</strong> {sponsor.email}</p>
          <p className="text-gray-700"><strong>Phone:</strong> {sponsor.phone}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Sponsorship Details</h3>
          <p className="text-gray-700"><strong>Level:</strong> {sponsor.sponsorshipLevel}</p>
          <p className="text-gray-700"><strong>Contract End Date:</strong> {sponsor.contractEndDate}</p>
        </div>
      </div>
    </div>
  );
};

export default SponsorPage;