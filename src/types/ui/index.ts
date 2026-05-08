export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  subtitle?: string;
  active?: boolean;
  defaultOpen?: boolean;
  children?: NavLink[];
}

export interface HeroAction {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export interface HeroProfile {
  name: string;
  email?: string;
  readingTime?: string;
}

export interface HeroData {
  headline: string;
  subheadline: string;
  description: string;
  tags?: string[];
  actions: HeroAction[];
  profile?: HeroProfile;
}

export interface ArticleCardData {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
  category?: string;
}

export interface StatCardData {
  label: string;
  value: string;
  trend?: string;
}
