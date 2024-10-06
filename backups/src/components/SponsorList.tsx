import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit } from 'lucide-react';
import { Sponsor } from '../types';
import { fetchSponsors, addSponsor, fetchCategories, addCategory, updateSponsor } from '../utils/airtable';
import AddSponsorForm from './AddSponsorForm';
import EditSponsorForm from './EditSponsorForm';
import AddCategoryForm from './AddCategoryForm';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const SponsorList: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showAddSponsorForm, setShowAddSponsorForm] = useState(false);
  const [showEditSponsorForm, setShowEditSponsorForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSponsorsAndCategories();
  }, []);

  const loadSponsorsAndCategories = async () => {
    try {
      const [fetchedSponsors, fetchedCategories] = await Promise.all([
        fetchSponsors(),
        fetchCategories()
      ]);
      setSponsors(fetchedSponsors);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load sponsors and categories. Please try again.');
    }
  };

  const handleAddSponsor = async (sponsorData: FormData) => {
    try {
      await addSponsor(sponsorData);
      await loadSponsorsAndCategories();
      setShowAddSponsorForm(false);
    } catch (error) {
      console.error('Error adding sponsor:', error);
      setError('Failed to add sponsor. Please try again.');
    }
  };

  const handleEditSponsor = async (sponsorId: string, sponsorData: Partial<Sponsor>) => {
    try {
      await updateSponsor(sponsorId, sponsorData);
      await loadSponsorsAndCategories();
      setShowEditSponsorForm(false);
    } catch (error) {
      console.error('Error updating sponsor:', error);
      setError('Failed to update sponsor. Please try again.');
    }
  };

  const handleAddCategory = async (categoryName: string) => {
    try {
      await addCategory(categoryName);
      await loadSponsorsAndCategories();
      setShowAddCategoryForm(false);
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Failed to add category. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Sponsors</h1>
        <Button onClick={() => setShowAddCategoryForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          <Plus className="mr-2 h-4 w-4" /> Add New Sponsor Category
        </Button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {categories.map(category => (
        <Card key={category} className="overflow-hidden shadow-lg">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-gray-800">{category} Sponsors</CardTitle>
              <Button onClick={() => {
                setSelectedCategory(category);
                setShowAddSponsorForm(true);
              }} className="bg-green-500 hover:bg-green-600 text-white font-semibold">
                <Plus className="mr-2 h-4 w-4" /> Add New Sponsor
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contract End</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {sponsors
                    .filter(sponsor => sponsor.sponsorshipLevel === category)
                    .map(sponsor => (
                      <tr key={sponsor.id} className="hover:bg-gray-50 transition-colors duration-150 rounded-3xl">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link to={`/sponsor/${sponsor.id}`} className="flex items-center">
                            <img src={Array.isArray(sponsor.logo) && sponsor.logo.length > 0 ? sponsor.logo[0].url : ''} alt={sponsor.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                            <span className="hover:text-blue-600 transition-colors duration-150">{sponsor.name}</span>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sponsor.contactPerson}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sponsor.contractEndDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedSponsor(sponsor);
                              setShowEditSponsorForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}

      {showAddSponsorForm && (
        <AddSponsorForm
          categories={categories}
          onClose={() => setShowAddSponsorForm(false)}
          onSubmit={handleAddSponsor}
          initialCategory={selectedCategory}
        />
      )}

      {showEditSponsorForm && selectedSponsor && (
        <EditSponsorForm
          sponsor={selectedSponsor}
          categories={categories}
          onClose={() => setShowEditSponsorForm(false)}
          onSubmit={handleEditSponsor}
        />
      )}

      {showAddCategoryForm && (
        <AddCategoryForm
          onClose={() => setShowAddCategoryForm(false)}
          onSubmit={handleAddCategory}
        />
      )}
    </div>
  );
};

export default SponsorList;