import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  registerUserAPI,
  sendRedefinePasswordAPI,
  firstAccessAPI,
  updatePasswordAPI,
} from "./auth.service";

const MOCK_API_URL = "https://fake-supabase.com";
const MOCK_API_KEY = "fake-anon-key";

describe("Auth Service", () => {
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);

  beforeEach(() => {
    vi.stubEnv("VITE_SUPABASE_URL", MOCK_API_URL);
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", MOCK_API_KEY);

    fetchMock.mockClear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("registerUserAPI", () => {
    const mockPayload = {
      email: "teste@baymetrics.com",
      name: "Guilherme",
      sector_id: 1,
      access_level: "admin",
    };

    it("deve fazer o fetch na url correta com os headers e payloads", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, user: "123" }),
      });

      const response = await registerUserAPI(mockPayload);
      expect(response).toEqual({ success: true, user: "123" });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        `${MOCK_API_URL}/functions/v1/Auth/admin/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: MOCK_API_KEY,
            Authorization: `Bearer ${MOCK_API_KEY}`,
          },
          body: JSON.stringify(mockPayload),
        },
      );
    });

    it("deve mostrar um erro com a mensagem json da api quando falhar", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => JSON.stringify({ message: "E-mail já cadastrado." }),
      });
      await expect(registerUserAPI(mockPayload)).rejects.toThrow(
        "E-mail já cadastrado.",
      );
    });

    it("deve lançar um erro se API não retorne um json valido", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => "Internal Server Error",
      });
      await expect(registerUserAPI(mockPayload)).rejects.toThrow(
        "Internal Server Error",
      );
    });

    it('deve usar o campo "error" do JSON caso "message" não exista', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () =>
          JSON.stringify({ error: "Erro de permissão no Supabase." }),
      });
      await expect(registerUserAPI(mockPayload)).rejects.toThrow(
        "Erro de permissão no Supabase.",
      );
    });

    it("deve usar a mensagem padrão se o JSON de erro não tiver message nem error", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => JSON.stringify({}),
      });
      await expect(registerUserAPI(mockPayload)).rejects.toThrow(
        "Erro ao cadastrar usuário.",
      );
    });

    it("deve usar a mensagem padrão no catch se a API retornar um texto vazio", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => "",
      });
      await expect(registerUserAPI(mockPayload)).rejects.toThrow(
        "Erro ao cadastrar usuário.",
      );
    });
  });

  describe("sendRedefinePasswordAPI", () => {
    it("deve enviar o e-mail para redefinição", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await sendRedefinePasswordAPI({ email: "teste@teste.com" });

      expect(fetchMock).toHaveBeenCalledWith(
        `${MOCK_API_URL}/functions/v1/Auth/send-redefine-password`,
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "teste@teste.com" }),
        }),
      );
    });

    it("deve lançar um erro com a mensagem JSON da API quando falhar", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => JSON.stringify({ message: "E-mail não encontrado." }),
      });
      await expect(
        sendRedefinePasswordAPI({ email: "errado@teste.com" }),
      ).rejects.toThrow("E-mail não encontrado.");
    });

    it("deve lançar um erro caso a API não retorne um JSON válido", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => "Service Unavailable",
      });
      await expect(
        sendRedefinePasswordAPI({ email: "errado@teste.com" }),
      ).rejects.toThrow("Service Unavailable");
    });

    it('deve usar o campo "error" do JSON caso "message" não exista', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () =>
          JSON.stringify({ error: "Erro interno no Supabase." }),
      });
      await expect(
        sendRedefinePasswordAPI({ email: "teste@teste.com" }),
      ).rejects.toThrow("Erro interno no Supabase.");
    });

    it("deve usar a mensagem padrão se o JSON de erro não tiver message nem error", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => JSON.stringify({}),
      });
      await expect(
        sendRedefinePasswordAPI({ email: "teste@teste.com" }),
      ).rejects.toThrow("Erro ao enviar e-mail.");
    });

    it("deve usar a mensagem padrão no catch se a API retornar um texto vazio", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => "",
      });
      await expect(
        sendRedefinePasswordAPI({ email: "teste@teste.com" }),
      ).rejects.toThrow("Erro ao enviar e-mail.");
    });
  });

  describe("firstAccessAPI", () => {
    const mockPasswordPayload = {
      password: "newpassword123",
      confirm_password: "newpassword123",
    };

    it("deve usar o token passado no payload como authorization header", async () => {
      fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

      await firstAccessAPI({
        ...mockPasswordPayload,
        token: "meu-token-secreto",
      });

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer meu-token-secreto",
          }),
        }),
      );
    });

    it("deve usar SUPABASE_KEY como fallback se nenhum token for passado", async () => {
      fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

      await firstAccessAPI(mockPasswordPayload);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${MOCK_API_KEY}`,
          }),
        }),
      );
    });

    it("deve lançar um erro com a mensagem JSON da API quando falhar", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () =>
          JSON.stringify({ message: "Token inválido ou expirado." }),
      });
      await expect(firstAccessAPI(mockPasswordPayload)).rejects.toThrow(
        "Token inválido ou expirado.",
      );
    });

    it("deve lançar um erro caso a API não retorne um JSON válido", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => "Bad Request",
      });
      await expect(firstAccessAPI(mockPasswordPayload)).rejects.toThrow(
        "Bad Request",
      );
    });
    it('deve usar o campo "error" do JSON caso "message" não exista', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () =>
          JSON.stringify({ error: "Token expirado ou inválido." }),
      });
      await expect(firstAccessAPI(mockPasswordPayload)).rejects.toThrow(
        "Token expirado ou inválido.",
      );
    });

    it("deve usar a mensagem padrão se o JSON de erro não tiver message nem error", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => JSON.stringify({}),
      });
      await expect(firstAccessAPI(mockPasswordPayload)).rejects.toThrow(
        "Erro ao salvar nova senha.",
      );
    });

    it("deve usar a mensagem padrão no catch se a API retornar um texto vazio", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => "",
      });
      await expect(firstAccessAPI(mockPasswordPayload)).rejects.toThrow(
        "Erro ao salvar nova senha.",
      );
    });
  });

  describe("updatePasswordAPI", () => {
    const mockUpdatePayload = {
      password: "nova-senha",
      confirm_password: "nova-senha",
      token: "token-valido-123",
    };

    it("deve realizar o fetch na rota /update-password com sucesso", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const response = await updatePasswordAPI(mockUpdatePayload);
      expect(response).toEqual({ success: true });
    });

    it("deve lançar um erro com a mensagem JSON da API quando falhar", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () =>
          JSON.stringify({
            message: "A nova senha deve ser diferente da atual.",
          }),
      });
      await expect(updatePasswordAPI(mockUpdatePayload)).rejects.toThrow(
        "A nova senha deve ser diferente da atual.",
      );
    });

    it("deve lançar um erro caso a API não retorne um JSON válido", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => "Gateway Timeout",
      });
      await expect(updatePasswordAPI(mockUpdatePayload)).rejects.toThrow(
        "Gateway Timeout",
      );
    });

    it("deve usar SUPABASE_KEY no cabeçalho se nenhum token for passado", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });
      await updatePasswordAPI({
        password: "nova-senha",
        confirm_password: "nova-senha",
      });

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${MOCK_API_KEY}`,
          }),
        }),
      );
    });

    it('deve usar o campo "error" do JSON caso "message" não exista', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => JSON.stringify({ error: "A senha é muito fraca." }),
      });
      await expect(updatePasswordAPI(mockUpdatePayload)).rejects.toThrow(
        "A senha é muito fraca.",
      );
    });

    it("deve usar a mensagem padrão se o JSON de erro não tiver message nem error", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => JSON.stringify({}),
      });
      await expect(updatePasswordAPI(mockUpdatePayload)).rejects.toThrow(
        "Erro ao redefinir senha.",
      );
    });

    it("deve usar a mensagem padrão no catch se a API retornar um texto vazio", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => "",
      });
      await expect(updatePasswordAPI(mockUpdatePayload)).rejects.toThrow(
        "Erro ao redefinir senha.",
      );
    });
  });
});
