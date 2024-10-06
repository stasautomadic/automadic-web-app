import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';
import { Sponsor } from '../types';

interface EditSponsorFormProps {
  sponsor: Sponsor;
  categories: string[];
  onClose: () => void;
  onSubmit: (sponsorId: string, sponsorData: Partial<Sponsor>) => Promise<void>;
}

const EditSponsorForm: React.FC<EditSponsorFormProps> = ({ sponsor, categories, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: sponsor.name,
    industry: sponsor.industry,
    contactPerson: sponsor.contactPerson,
    email: sponsor.email,
    phone: sponsor.phone,
    contractEndDate: sponsor.contractEndDate,
    sponsorshipLevel: sponsor.sponsorshipLevel,
    logo: Array.isArray(sponsor.logo) && sponsor.logo.length > 0 ? sponsor.logo[0] : '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const updatedSponsor: Partial<Sponsor> = {
        ...formData,
        logo: [formData.logo], // Ensure logo is an array
      };
      await onSubmit(sponsor.id, updatedSponsor);
      onClose();
    } catch (error) {
      console.error('Error updating sponsor:', error);
      setError('Failed to update sponsor. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Sponsor</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Sponsor Name</Label>
            <Input type="text" id="name" name="name" required
              value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input type="text" id="industry" name="industry" required
              value={formData.industry} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input type="text" id="contactPerson" name="contactPerson" required
              value={formData.contactPerson} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email">Contact Email</Label>
            <Input type="email" id="email" name="email" required
              value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="phone">Contact Phone</Label>
            <Input type="tel" id="phone" name="phone" required
              value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="contractEndDate">Contract End Date</Label>
            <Input type="date" id="contractEndDate" name="contractEndDate" required
              value={formData.contractEndDate} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="sponsorshipLevel">Sponsorship Level</Label>
            <Select id="sponsorshipLevel" name="sponsorshipLevel" required
              value={formData.sponsorshipLevel} onChange={handleChange}>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="logo">Sponsor Logo URL</Label>
            <Input type="url" id="logo" name="logo"
              value={formData.logo} onChange={handleChange} placeholder="https://example.com/logo.png" />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Sponsor'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditSponsorForm;