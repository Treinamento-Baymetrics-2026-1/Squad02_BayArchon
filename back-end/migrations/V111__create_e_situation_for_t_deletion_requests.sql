DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_namespace n
            ON n.oid = t.typnamespace
        WHERE t.typname = 'e_situation_t_deletion_requests'
          AND n.nspname = 'documents'
    ) THEN
        CREATE TYPE documents.e_situation_t_deletion_requests AS ENUM (
            'pending',
            'approved',
            'rejected'
        );
    END IF;
END
$$;