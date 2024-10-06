import Airtable from 'airtable';
import { Sponsor } from '../types';

const base = new Airtable({apiKey: import.meta.env.VITE_AIRTABLE_API_KEY}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);
const sponsorsTable = base(import.meta.env.VITE_AIRTABLE_TABLE_ID);

export const fetchSponsors = async (): Promise<Sponsor[]> => {
  try {
    const records = await sponsorsTable.select().all();
    return records.map(record => ({
      id: record.id,
      name: record.get('sponsor_name') as string,
      logo: record.get('sponsor_logo') as string[],
      industry: record.get('industry') as string,
      contactPerson: record.get('contact_person') as string,
      email: record.get('contact_email') as string,
      phone: record.get('contact_phone') as string,
      sponsorshipLevel: record.get('level') as string,
      contractEndDate: record.get('contract_end') as string,
    }));
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    throw error;
  }
};

export const addSponsor = async (sponsorData: FormData): Promise<void> => {
  try {
    const fields: any = {};
    for (const [key, value] of sponsorData.entries()) {
      if (key === 'sponsor_logo') {
        fields[key] = [{ url: value as string }];
      } else {
        fields[key] = value;
      }
    }

    await sponsorsTable.create([{ fields }]);
  } catch (error) {
    console.error('Error adding sponsor:', error);
    throw error;
  }
};

export const updateSponsor = async (sponsorId: string, sponsorData: Partial<Sponsor>): Promise<void> => {
  try {
    const fields: any = {
      sponsor_name: sponsorData.name,
      industry: sponsorData.industry,
      contact_person: sponsorData.contactPerson,
      contact_email: sponsorData.email,
      contact_phone: sponsorData.phone,
      level: sponsorData.sponsorshipLevel,
      contract_end: sponsorData.contractEndDate,
    };
    
    if (sponsorData.logo && sponsorData.logo.length > 0) {
      fields.sponsor_logo = [{ url: sponsorData.logo[0] }];
    }
    
    await sponsorsTable.update(sponsorId, fields);
  } catch (error) {
    console.error('Error updating sponsor:', error);
    throw error;
  }
};

export const deleteSponsor = async (sponsorId: string): Promise<void> => {
  try {
    await sponsorsTable.destroy(sponsorId);
  } catch (error) {
    console.error('Error deleting sponsor:', error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const records = await sponsorsTable.select({
      fields: ['level'],
      filterByFormula: 'NOT({level} = "")'
    }).all();
    const categories = new Set(records.map(record => record.get('level') as string));
    return Array.from(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const addCategory = async (categoryName: string): Promise<void> => {
  try {
    await sponsorsTable.create([{ fields: { level: categoryName } }]);
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

export const deleteCategory = async (categoryName: string): Promise<void> => {
  try {
    const records = await sponsorsTable.select({
      filterByFormula: `{level} = '${categoryName}'`
    }).all();
    
    const recordIds = records.map(record => record.id);
    
    if (recordIds.length > 0) {
      await sponsorsTable.destroy(recordIds);
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};