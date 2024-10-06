import Airtable from 'airtable';
import { Sponsor } from '../types';
import { uploadFileToS3 } from './s3';

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
      if (key !== 'sponsor_logo') {
        fields[key] = value;
      }
    }

    const logoFile = sponsorData.get('sponsor_logo') as File;
    if (logoFile) {
      const logoUrl = await uploadFileToS3(logoFile);
      fields.sponsor_logo = [{ url: logoUrl }];
    }

    await sponsorsTable.create([{ fields }]);
  } catch (error) {
    console.error('Error adding sponsor:', error);
    throw error;
  }
};

export const updateSponsor = async (sponsorId: string, sponsorData: Partial<Sponsor>): Promise<void> => {
  try {
    const fields: any = { ...sponsorData };
    if (fields.logo instanceof File) {
      const logoUrl = await uploadFileToS3(fields.logo);
      fields.sponsor_logo = [{ url: logoUrl }];
      delete fields.logo;
    }
    await sponsorsTable.update(sponsorId, fields);
  } catch (error) {
    console.error('Error updating sponsor:', error);
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