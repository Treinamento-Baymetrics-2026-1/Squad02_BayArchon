ALTER TABLE registry.t_companies_clients
ADD COLUMN IF NOT EXISTS cpf CHAR(11) NULL;