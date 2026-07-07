export interface AuthRegisterDTO{
    email: string;
    name: string;
    access_level: "Gestor" | "Colaborador";
    sector_id: number;
}