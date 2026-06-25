DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE t.typname = 'e_is_enabled_t_users'
          AND n.nspname = 'registry'
    ) THEN
        CREATE TYPE registry.e_is_enabled_t_users AS ENUM (
            'created',
            'active',
            'on_leave',
            'terminated'
        );
    END IF;
END
$$;