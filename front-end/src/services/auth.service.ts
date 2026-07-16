export type RegisterPayload = {
  email: string;
  name: string;
  sector_id: number;
  access_level: string;
};

export async function registerUserAPI(data: RegisterPayload) {

  const API_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const response = await fetch(`${API_URL}/Auth/admin/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_KEY}` 
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao cadastrar usuário na API.');
  }

  return response.json();
}