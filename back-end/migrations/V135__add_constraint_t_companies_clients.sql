DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'chk_companies_clients_email'
          AND conrelid = 'registry.t_companies_clients'::regclass
    ) THEN
        ALTER TABLE registry.t_companies_clients
        ADD CONSTRAINT chk_companies_clients_email
        CHECK (
            email IS NOT NULL
            AND email !~ '\s'
            AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
        );
    END IF;
END;
$$;