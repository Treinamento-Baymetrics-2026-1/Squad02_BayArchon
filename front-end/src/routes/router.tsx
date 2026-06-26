import { createBrowserRouter } from "react-router-dom";
import { Login } from "@/pages/login";
import { RegisterUser } from "@/pages/registerUserForm";
import { RegisterClient } from "@/pages/registerClientForm";

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
  }
]);
