DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_namespace n
            ON n.oid = t.typnamespace
        WHERE t.typname = 'e_type_t_notifications'
          AND n.nspname = 'notifications'
    ) THEN
        CREATE TYPE notifications.e_type_t_notifications AS ENUM (
            'document',
            'contract',
            'system'
        );
    END IF;
END
$$;