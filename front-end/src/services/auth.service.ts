// src/services/auth.service.ts

export interface RegisterPayload {
  email: string;
  name: string;
  sector_id: number;
  access_level: string;
}

export async function registerUserAPI(data: RegisterPayload) {
  // SIMULAÇÃO (MOCK): Espera 2 segundos para fingir que foi na nuvem
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simula um erro de e-mail repetido (descomente para testar o erro na tela)
  // throw new Error("Esse e-mail já está cadastrado.");

  // Simula o sucesso
  console.log("Enviado para o backend:", data);
  return { success: true, message: "Usuário cadastrado com sucesso!" };

  /* QUANDO O LUCAS TERMINAR, VOCÊ APAGA A SIMULAÇÃO ACIMA E DESCOMENTA ABAIXO:
  const response = await fetch('URL_DO_LUCAS', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ...' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao cadastrar');
  return response.json();
  */
}