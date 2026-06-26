DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE t.typname = 'status_profiles'
          AND n.nspname = 'registry'
    ) THEN
        CREATE TYPE registry.status_profiles AS ENUM (
            'created',
            'active',
            'on_leave',
            'terminated'
        );
    END IF;
END
$$;