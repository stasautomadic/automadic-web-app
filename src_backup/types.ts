export interface Sponsor {
  id: string;
  name: string;
  logo: string[];
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