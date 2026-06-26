DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE t.typname = 'e_event_type_t_logs'
          AND n.nspname = 'logs'
    ) THEN
        CREATE TYPE logs.e_event_type_t_logs
         AS ENUM (
            --Documents
            'document_visibility_changed_to_public',
            'document_visibility_changed_to_private',
            'document_created',
            'document_updated',
            'document_deleted',

            --Contracts
            'contract_created',
            'contract_expired',
            'contract_updated',
            'contract_type_created',
            'contract_type_updated',


            --Users
            'user_created',
            'user_is_enabled_changed_to_active',
            'user_is_enabled_changed_to_on_leave',
            'user_is_enabled_changed_to_terminated',
            'user_updated',
            'user_deleted'

            --Sectors
            'sector_created',
            'sector_updated',
            'sector_deleted',

            --Categories
            'category_created',
            'category_updated',
            'category_deleted',

            --Projects
            'project_current_stage_changed_to_in_progress',
            'project_current_stage_changed_to_finished' -- colocar cada tipo de status
            'project_created',
            'project_updated',

            --Companies_clientes
            'company_client_is_enabled_changed_to_active',
            'company_client_is_enabled_changed_to_terminated',
            'company_client_created',
            'company_client_updated'

        );
    END IF;
END;
$$;
