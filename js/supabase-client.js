// ============================================================
// Configuração do Supabase — usada pelo site público e pelo /admin
// A anon key é pública por design (protegida pelas regras RLS
// configuradas no banco), então não tem problema ela estar aqui.
// ============================================================

const SUPABASE_URL = "https://qysqpnlfsahxectikvyn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5c3Fwbmxmc2FoeGVjdGlrdnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MDk2NjIsImV4cCI6MjEwMzI4NTY2Mn0.AHOvc839XIjIB5ib17Ac2jlD3L5PQSuLl8fKL21ku2w";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
