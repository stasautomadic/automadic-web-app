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
    contactPerson: sponsor.contactPerson,
    email: sponsor.email,
    phone: sponsor.phone,
    contractEndDate: sponsor.contractEndDate,
    sponsorshipLevel: sponsor.sponsorshipLevel,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const updatedFields: Partial<Sponsor> = { ...formData };

    try {
      await onSubmit(sponsor.id, updatedFields);
      if (logoFile) {
        await onSubmit(sponsor.id, { logo: logoFile });
      }
      onClose();
    } catch (error) {
      console.error('Error updating sponsor:', error);
      if (error instanceof Error) {
        setError(`Failed to update sponsor: ${error.message}`);
      } else {
        setError('An unknown error occurred while updating the sponsor');
      }
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
            <Label htmlFor="logo">Sponsor Logo</Label>
            <Input type="file" id="logo" name="logo" accept="image/*"
              onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
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