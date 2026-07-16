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
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage: string;

    try {
      const errorJson = JSON.parse(errorText);
      errorMessage =
        errorJson.message || errorJson.error || "Erro ao cadastrar usuário.";
    } catch {
      errorMessage = errorText || "Erro ao cadastrar usuário.";
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

export type SendRedefinePayload = {
  email: string;
};

export type UpdatePasswordPayload = {
  password: string;
  confirm_password: string;
  token?: string | null;
};

export async function sendRedefinePasswordAPI(data: SendRedefinePayload) {
  const API_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const response = await fetch(
    `${API_URL}/functions/v1/Auth/send-redefine-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage: string;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage =
        errorJson.message || errorJson.error || "Erro ao enviar e-mail.";
    } catch {
      errorMessage = errorText || "Erro ao enviar e-mail.";
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function firstAccessAPI(data: UpdatePasswordPayload) {
  const API_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const authHeader = data.token
    ? `Bearer ${data.token}`
    : `Bearer ${SUPABASE_KEY}`;

  const response = await fetch(
    `${API_URL}/functions/v1/Auth/user/first-access`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: authHeader,
      },
      body: JSON.stringify({
        password: data.password,
        confirm_password: data.confirm_password,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage: string;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage =
        errorJson.message || errorJson.error || "Erro ao salvar nova senha.";
    } catch {
      errorMessage = errorText || "Erro ao salvar nova senha.";
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function updatePasswordAPI(data: UpdatePasswordPayload) {
  const API_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const authHeader = data.token
    ? `Bearer ${data.token}`
    : `Bearer ${SUPABASE_KEY}`;

  const response = await fetch(`${API_URL}/functions/v1/Auth/update-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: authHeader,
    },
    body: JSON.stringify({
      password: data.password,
      confirm_password: data.confirm_password,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage: string;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage =
        errorJson.message || errorJson.error || "Erro ao redefinir senha.";
    } catch {
      errorMessage = errorText || "Erro ao redefinir senha.";
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
