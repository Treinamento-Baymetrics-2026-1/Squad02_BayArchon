import { useMutation } from "@tanstack/react-query";
import {
  registerUserAPI,
  type RegisterPayload,
} from "../services/auth.service";

export function useRegisterUser() {
  return useMutation({
    mutationFn: (data: RegisterPayload) => registerUserAPI(data),
    onSuccess: () => {
      alert("Usuário criado com sucesso!");
    },
    onError: (error) => {
      alert(`Falha: ${error.message}`);
    },
  });
}
