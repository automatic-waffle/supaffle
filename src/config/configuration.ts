export default () => ({
  port: Number(process.env.PORT) || 3000,
  corsWhitelist: process.env.CORS_WHITELIST.split(','),
  supabase: {
    apiKey: process.env.SUPABASE_API_KEY || '',
    apiUrl: process.env.SUPABASE_API_URL || '',
  },
});
