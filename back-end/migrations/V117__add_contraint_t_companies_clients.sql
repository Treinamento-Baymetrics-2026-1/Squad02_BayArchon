DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'uq_companies_clients_cpf'
          AND conrelid = 'registry.t_companies_clients'::regclass
    ) THEN
        ALTER TABLE registry.t_companies_clients
        ADD CONSTRAINT uq_companies_clients_cpf
        UNIQUE (cpf);
    END IF;
END
$$;