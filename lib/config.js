import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  supabaseApiKey: process.env.SUPABASE_API_KEY,
  supabaseApiUrl: process.env.SUPABASE_API_URL,
};
