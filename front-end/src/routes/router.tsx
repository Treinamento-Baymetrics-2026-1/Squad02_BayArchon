import { createBrowserRouter } from "react-router-dom";
//import { Login } from "@/pages/login";
import { Register } from "@/pages/registerUse";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  /* 
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  */
]);
