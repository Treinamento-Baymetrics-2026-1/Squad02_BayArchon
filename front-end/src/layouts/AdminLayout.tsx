// src/layouts/AdminLayout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Siderbar';
import { Header } from '../components/admin-page/Header';

export function AdminLayout() {
  return (
    <div className="flex h-screen bg-white font-sans text-preto-claro">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Aqui é onde a mágica acontece. 
            O React Router vai injetar a DashboardPage, UsuariosPage, etc, aqui dentro! */}
        <div className="flex-1 overflow-y-auto">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}