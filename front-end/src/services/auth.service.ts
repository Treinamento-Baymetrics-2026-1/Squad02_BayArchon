export type RegisterPayload = {
  email: string;
  name: string;
  sector_id: number;
  access_level: string;
};

export async function registerUserAPI(data: RegisterPayload) {
  const API_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const response = await fetch(`${API_URL}/functions/v1/Auth/admin/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage: string;

    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorJson.error || "Erro ao cadastrar usuário.";
    } catch {
      errorMessage = errorText || "Erro ao cadastrar usuário.";
    }

    throw new Error(errorMessage);
  }

  return response.json();
}
