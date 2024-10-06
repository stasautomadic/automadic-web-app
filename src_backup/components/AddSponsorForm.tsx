import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';

interface AddSponsorFormProps {
  categories: string[];
  onClose: () => void;
  onSubmit: (sponsorData: FormData) => Promise<void>;
  initialCategory: string;
}

const AddSponsorForm: React.FC<AddSponsorFormProps> = ({ categories, onClose, onSubmit, initialCategory }) => {
  const [formData, setFormData] = useState({
    sponsor_name: '',
    industry: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    contract_end: '',
    level: initialCategory,
    sponsor_logo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });
    await onSubmit(formDataToSubmit);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Sponsor</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="sponsor_name">Sponsor name</Label>
            <Input
              type="text"
              id="sponsor_name"
              name="sponsor_name"
              value={formData.sponsor_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="contact_person">Contact person</Label>
            <Input
              type="text"
              id="contact_person"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="contact_email">Contact email</Label>
            <Input
              type="email"
              id="contact_email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="contact_phone">Contact phone</Label>
            <Input
              type="tel"
              id="contact_phone"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="contract_end">Contract end</Label>
            <Input
              type="date"
              id="contract_end"
              name="contract_end"
              value={formData.contract_end}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="level">Level</Label>
            <Select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="sponsor_logo">Sponsor logo</Label>
            <Input
              type="url"
              id="sponsor_logo"
              name="sponsor_logo"
              value={formData.sponsor_logo}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
            />
          </div>
          <Button type="submit" className="w-full">
            Add Sponsor
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddSponsorForm;