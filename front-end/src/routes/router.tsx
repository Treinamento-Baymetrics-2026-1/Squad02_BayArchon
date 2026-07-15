import { createBrowserRouter } from "react-router-dom";
import { Login } from "@/pages/login";
import { RegisterUser } from "@/pages/registerUserForm";
import { RegisterClient } from "@/pages/registerClientForm";

import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminPage } from "@/pages/AdminPage";
import { AiChatPage } from "@/pages/AiChatPage";
import { UserPage } from "@/pages/UserPage";
import { ConstructionPage } from "@/pages/ConstructionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/cadastro",
    element: <RegisterUser />,
  },

  {
    path: "/cadastro-cliente",
    element: <RegisterClient />,
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "chat",
        element: <AiChatPage />,
      },
      {
        path: "usuarios",
        element: <UserPage />,
      },
      {
        path: "documentos",
        element: <ConstructionPage title="Documentos" />,
      },
      {
        path: "clientes",
        element: <ConstructionPage title="Clientes" />,
      },
      {
        path: "setores",
        element: <ConstructionPage title="Setores" />,
      },
      {
        path: "lixeira",
        element: <ConstructionPage title="Lixeira" />,
      },
      {
        path: "configuracoes",
        element: <ConstructionPage title="Configurações" />,
      },
      {
        path: "*",
        element: <ConstructionPage title="Recurso indisponível" />,
      },
    ],
  },
  {
    path: "*",
    element: <ConstructionPage title="Página não encontrada" />,
  },
]);
