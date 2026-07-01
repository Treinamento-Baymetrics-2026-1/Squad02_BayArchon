DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE t.typname = 'e_visibility_t_documents'
          AND n.nspname = 'documents'
    ) THEN
        CREATE TYPE documents.e_visibility_t_documents AS ENUM (
            'private',
            'public'
        );
    END IF;
END
$$;