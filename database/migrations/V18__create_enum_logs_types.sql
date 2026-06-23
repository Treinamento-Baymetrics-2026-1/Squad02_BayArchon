DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE t.typname = 'type_logs'
          AND n.nspname = 'logs'
    ) THEN
        CREATE TYPE logs.type_logs AS ENUM (
            'status_changed_t_documents',
            'document_created',
            'document_updated',
            'contract_created',
            'contract_expired',
            'contract_updated',
            'contract_type_created',
            'contract_type_updated',
            'profile_created',
            'profile_status_changed',
            'profile_updated',
            'sector_created',
            'sector_updated',
            'category_created',
            'category_updated',
            'project_status_changed',
            'project_created',
            'project_updated',
            'company_client_status_changed',
            'company_client_created',
            'company_client_updated',
            'soft_delete'
        );
    END IF;
END;
$$;
