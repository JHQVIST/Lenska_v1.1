export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  subcategories?: Subcategory[];
  image?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}
