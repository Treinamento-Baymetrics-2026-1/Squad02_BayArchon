DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'fk_documents_object_file'
          AND conrelid = 'documents.t_documents'::regclass
    ) THEN
        ALTER TABLE documents.t_documents
        ADD CONSTRAINT fk_documents_object_file
        FOREIGN KEY (object_file)
        REFERENCES storage.objects(id);
    END IF;
END
$$;