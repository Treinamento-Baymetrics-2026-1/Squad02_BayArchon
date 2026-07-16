DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'registry'
          AND tablename = 't_contracts'
    ) THEN
        ALTER TABLE registry.t_contracts
        SET SCHEMA documents;
    END IF;

    IF EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'registry'
          AND tablename = 't_contracts'
    ) THEN
        ALTER TABLE registry.t_contracts
        SET SCHEMA documents;
    END IF;
END;
$$;