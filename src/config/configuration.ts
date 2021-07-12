export default () => ({
  port: Number(process.env.PORT) || 3000,
  supabase: {
    apiKey: process.env.SUPABASE_API_KEY || '',
    apiUrl: process.env.SUPABASE_API_URL || '',
  },
});
