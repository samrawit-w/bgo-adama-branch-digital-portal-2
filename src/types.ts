export type Language = 'om' | 'am' | 'en';

export interface Campaign {
  id: string;
  title_om: string;
  title_am: string;
  title_en: string;
  description_om: string;
  description_am: string;
  description_en: string;
  targetAmount: number;
  currentAmount: number;
  endDate: string;
  category: 'emergency' | 'community' | 'education' | 'development' | 'agricultural';
  image: string;
}

export interface NewsItem {
  id: string;
  title_om: string;
  title_am: string;
  title_en: string;
  content_om: string;
  content_am: string;
  content_en: string;
  date: string;
  category: 'announcement' | 'education' | 'update';
  image: string;
}

export interface CommunityEvent {
  id: string;
  title_om: string;
  title_am: string;
  title_en: string;
  description_om: string;
  description_am: string;
  description_en: string;
  date: string;
  time: string;
  location_om: string;
  location_am: string;
  location_en: string;
  category: 'meeting' | 'training' | 'celebration';
}

export interface ServiceProduct {
  id: string;
  type: 'savings' | 'loans' | 'insurance';
  name_om: string;
  name_am: string;
  name_en: string;
  description_om: string;
  description_am: string;
  description_en: string;
  eligibility_om: string;
  eligibility_am: string;
  eligibility_en: string;
  requirements_om: string;
  requirements_am: string;
  requirements_en: string;
  benefits_om: string;
  benefits_am: string;
  benefits_en: string;
}

export interface Contribution {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  amount: number;
  purpose: string;
  paymentMethod: 'telebirr' | 'cbe_birr' | 'bank_transfer';
  date: string;
  status: 'pending' | 'completed';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read';
}
