import { createBrowserRouter } from "react-router-dom";
import { Login } from "@/pages/login";
import { RegisterUser } from "@/pages/registerUserForm";
import { RegisterClient } from "@/pages/registerClientForm";

import {AdminLayout} from "@/layouts/AdminLayout";
import { AdminPage } from "@/pages/AdminPage";

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

      // depois colocar a pagina de usuarios, cliente...
    ],
  }
]);
