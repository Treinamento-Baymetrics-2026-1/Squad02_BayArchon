DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_namespace n
            ON n.oid = t.typnamespace
        WHERE t.typname = 'e_extension_t_documents_versions'
          AND n.nspname = 'documents'
    ) THEN
        CREATE TYPE documents.e_extension_t_documents_versions AS ENUM (
            'doc',
            'docx',
            'xls',
            'xlsx',
            'csv',
            'txt',
            'xml',
            'pdf'
        );
    END IF;
END
$$;