import { createBrowserRouter } from "react-router-dom";
import { Login } from "@/pages/login";
import { RegisterUser } from "@/pages/registerUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  
  {
    path: "/cadastro",
    element: <RegisterUser />,
  }
]);
