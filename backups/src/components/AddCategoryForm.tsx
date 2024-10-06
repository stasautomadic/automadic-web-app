import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface AddCategoryFormProps {
  onClose: () => void;
  onSubmit: (categoryName: string) => Promise<void>;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onClose, onSubmit }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!categoryName.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    try {
      await onSubmit(categoryName.trim());
      onClose();
    } catch (error) {
      setError('Failed to add category. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Sponsor Category</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="category_name">Category Name</Label>
            <Input
              type="text"
              id="category_name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button type="submit" className="w-full">
            Add Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;