import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  useRegisterUser,
  useSendRedefinePassword,
  useFirstAccess,
  useUpdatePassword,
} from "./UseAuth"; 
import * as authService from "@/services/auth.service";


vi.mock("@/services/auth.service", () => ({
  registerUserAPI: vi.fn(),
  sendRedefinePasswordAPI: vi.fn(),
  firstAccessAPI: vi.fn(),
  updatePasswordAPI: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false, 
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Hooks: UseAuth (TanStack Query)", () => {
  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    alertMock.mockClear();
  });

  describe("useRegisterUser", () => {
    const mockPayload = {
      email: "teste@baymetrics.com",
      name: "Guilherme",
      sector_id: 1,
      access_level: "admin",
    };

    it("deve chamar a API e exibir um alert de SUCESSO ao registrar", async () => {
      vi.mocked(authService.registerUserAPI).mockResolvedValueOnce({ success: true });

      const { result } = renderHook(() => useRegisterUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(mockPayload);
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(authService.registerUserAPI).toHaveBeenCalledWith(mockPayload);
      expect(alertMock).toHaveBeenCalledWith("Usuário criado com sucesso!");
    });

    it("deve chamar a API e exibir um alert de erro em caso de falha", async () => {

      vi.mocked(authService.registerUserAPI).mockRejectedValueOnce(
        new Error("E-mail já existe")
      );

      const { result } = renderHook(() => useRegisterUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(mockPayload);

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(alertMock).toHaveBeenCalledWith("Falha: E-mail já existe");
    });
  });

 
  describe("useSendRedefinePassword", () => {
    it("deve passar a chamada para sendRedefinePasswordAPI", async () => {
      vi.mocked(authService.sendRedefinePasswordAPI).mockResolvedValueOnce({ success: true });

      const { result } = renderHook(() => useSendRedefinePassword(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ email: "esqueci@teste.com" });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(authService.sendRedefinePasswordAPI).toHaveBeenCalledWith({
        email: "esqueci@teste.com",
      });
    });
  });

  describe("useFirstAccess & useUpdatePassword", () => {
    const mockPasswordData = {
      password: "123",
      confirm_password: "123",
      token: "abc",
    };

    it("useFirstAccess deve chamar a api", async () => {
      vi.mocked(authService.firstAccessAPI).mockResolvedValueOnce({ success: true });
      const { result } = renderHook(() => useFirstAccess(), { wrapper: createWrapper() });

      result.current.mutate(mockPasswordData);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(authService.firstAccessAPI).toHaveBeenCalledWith(mockPasswordData);
    });

    it("useUpdatePassword deve chamar a api", async () => {
      vi.mocked(authService.updatePasswordAPI).mockResolvedValueOnce({ success: true });
      const { result } = renderHook(() => useUpdatePassword(), { wrapper: createWrapper() });

      result.current.mutate(mockPasswordData);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(authService.updatePasswordAPI).toHaveBeenCalledWith(mockPasswordData);
    });
  });
});

