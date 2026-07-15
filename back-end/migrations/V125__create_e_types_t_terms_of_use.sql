DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_namespace n
            ON n.oid = t.typnamespace
        WHERE t.typname = 'e_type_terms'
          AND n.nspname = 'compliance'
    ) THEN
        CREATE TYPE compliance.e_type_terms AS ENUM (
            'terms_of_use',
            'privacy_policy',
            'cookie_policy',
            'data_processing',
            'service_agreement',
            'user_consent',
            'security_policy',
            'other'
        );
    END IF;
END
$$;