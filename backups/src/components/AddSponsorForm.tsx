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
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    contract_end: '',
    level: initialCategory,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

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
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });
    if (logoFile) {
      formDataToSubmit.append('sponsor_logo', logoFile);
    }
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
          {/* ... (other form fields) ... */}
          <div>
            <Label htmlFor="sponsor_logo">Sponsor Logo</Label>
            <Input type="file" id="sponsor_logo" name="sponsor_logo" accept="image/*"
              onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
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