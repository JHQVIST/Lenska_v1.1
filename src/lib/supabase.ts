import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (will be auto-generated later)
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          product_id: string;
          title: string;
          description: string | null;
          brand: string | null;
          category: string | null;
          product_type: string | null;
          image_url: string | null;
          condition: string;
          gtin: string | null;
          mpn: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      merchants: {
        Row: {
          id: string;
          merchant_id: string;
          name: string;
          logo_url: string | null;
          website_url: string | null;
          rating: number;
          review_count: number;
          is_active: boolean;
          created_at: string;
        };
      };
      product_offers: {
        Row: {
          id: string;
          product_id: string;
          merchant_id: string;
          price: number;
          currency: string;
          shipping_cost: number;
          availability: string;
          delivery_time: string | null;
          product_url: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      price_history: {
        Row: {
          id: string;
          product_id: string;
          merchant_id: string;
          price: number;
          currency: string;
          recorded_at: string;
        };
      };
      product_specifications: {
        Row: {
          id: string;
          product_id: string;
          spec_name: string;
          spec_value: string;
          spec_category: string | null;
        };
      };
    };
  };
};
