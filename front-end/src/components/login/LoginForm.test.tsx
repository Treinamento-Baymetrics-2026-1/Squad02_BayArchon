import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { LoginForm } from "./LoginForm"; 
import { supabase } from "@/lib/supabase";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

const renderLoginForm = () => {
  return render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
};

describe("LoginForm Component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });


  it("deve renderizar os campos de email, senha e o botão de entrar", () => {
    renderLoginForm();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /esqueceu a senha/i })).toBeInTheDocument();
  });


  it("deve exibir erros de validação se enviar o formulário vazio", async () => {
    renderLoginForm();

    const btnEntrar = screen.getByRole("button", { name: /entrar/i });
    await user.click(btnEntrar);

    await waitFor(() => {
      expect(screen.getByText("Digite um email válido.")).toBeInTheDocument();
      expect(screen.getByText("A senha deve ter pelo menos 6 caracteres.")).toBeInTheDocument();
    });
    expect(supabase.auth.signInWithPassword).not.toHaveBeenCalled();
  });


  it("deve exibir mensagem de erro quando as credenciais forem inválidas", async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
      data: { user: null, session: null } as never,
      error: { message: "Invalid login credentials", name: "AuthApiError", status: 400 } as never,
    });

    renderLoginForm();

    await user.type(screen.getByLabelText(/email/i), "teste@baymetrics.com");
    await user.type(screen.getByLabelText(/senha/i), "senhaerrada");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText("E-mail ou senha incorretos.")).toBeInTheDocument();
    });
  });

  
  it("deve exibir a tela de sucesso e navegar para /admin ao logar corretamente", async () => {
  
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
      data: { user: { id: "123" }, session: {} }as never,
      error: null,
    });

    renderLoginForm();

    await user.type(screen.getByLabelText(/email/i), "teste@baymetrics.com");
    await user.type(screen.getByLabelText(/senha/i), "senhaCorreta123");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText("Acesso confirmado!")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    }, { timeout: 2000 });

  });
});