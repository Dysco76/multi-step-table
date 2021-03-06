export interface PersonFormData {
  company: string;
  name: string;
  additional?: string;
  street?: string;
  postal?: string | number;
  IBAN: string;
  BIC: string;
  bank: string;
  fax?: string | number;
  email?: string;
  birthday?: string;
  homepage?: string;
  country?: string;
}
