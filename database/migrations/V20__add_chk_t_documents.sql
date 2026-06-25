DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint c
        INNER JOIN pg_class t ON t.oid = c.conrelid
        INNER JOIN pg_namespace n ON n.oid = t.relnamespace
        WHERE c.conname = 'chk_documents_created_at'
          AND n.nspname = 'documents'
          AND t.relname = 'documents'
    ) THEN
        ALTER TABLE documents.documents
        ADD CONSTRAINT chk_documents_created_at
        CHECK (
            created_at <= CURRENT_TIMESTAMP 
        );
    END IF;
END
$$;