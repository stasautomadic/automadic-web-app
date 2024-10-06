export interface Sponsor {
  id: string;
  name: string;
  logo: string | File;  // Updated to allow both string and File
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  sponsorshipLevel: string;
  contractEndDate: string;
}

export interface Team {
  id: string;
  name: string;
  sport: string;
  logo: string;
}