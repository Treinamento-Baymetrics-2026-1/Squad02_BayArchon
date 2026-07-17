import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Siderbar";
import { Header } from "../components/Header/Header";

export function AdminLayout() {
  return (
    <div className="flex h-screen bg-white font-sans text-preto-claro">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
