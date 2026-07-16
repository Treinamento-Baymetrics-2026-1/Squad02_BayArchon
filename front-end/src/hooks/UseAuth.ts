import { useMutation } from "@tanstack/react-query";
import {
  registerUserAPI,
  type RegisterPayload,
} from "../services/auth.service";
import {
  sendRedefinePasswordAPI,
  firstAccessAPI,
  updatePasswordAPI,
  type SendRedefinePayload,
  type UpdatePasswordPayload,
} from "@/services/auth.service";

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

export function useSendRedefinePassword() {
  return useMutation({
    mutationFn: (data: SendRedefinePayload) => sendRedefinePasswordAPI(data),
  });
}

export function useFirstAccess() {
  return useMutation({
    mutationFn: (data: UpdatePasswordPayload) => firstAccessAPI(data),
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (data: UpdatePasswordPayload) => updatePasswordAPI(data),
  });
}
