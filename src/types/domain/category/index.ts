export interface Category {
  id?: string;
  parentId?: string | null;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}
