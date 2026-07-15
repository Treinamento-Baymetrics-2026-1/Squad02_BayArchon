DO $$
BEGIN
    -- Remove a coluna antiga, caso exista
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'registry'
          AND table_name = 't_companies_clients'
          AND column_name = 'is_enabled'
    ) THEN
        ALTER TABLE companies.t_clients
            DROP COLUMN is_enabled;
    END IF;

    -- Cria a nova coluna, caso ainda não exista
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'registry'
          AND table_name = 't_companies_clients'
          AND column_name = 'is_active'
    ) THEN
        ALTER TABLE registry.t_companies_clients
            ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE;
    END IF;
END;
$$;