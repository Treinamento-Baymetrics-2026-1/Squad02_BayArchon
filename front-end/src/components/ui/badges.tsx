interface StatusBadgeProps {
  status: "Ativo" | "Inativo";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === "Ativo";
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        isActive
          ? "bg-verde-claro text-verde-escuro"
          : "bg-vermelho-claro text-vermelho-escuro"
      }`}
    >
      {status}
    </span>
  );
}

interface RoleBadgeProps {
  role: "Administrador" | "Gestor" | "Colaborador";
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const colors = {
    Administrador: "bg-azul-suave text-azul-corporativo",
    Gestor: "bg-amarelo-suave text-amarelo-escuro",
    Colaborador: "bg-roxo-suave text-roxo-escuro",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[role]}`}
    >
      {role}
    </span>
  );
}
