DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'compliance'
          AND table_name = 't_terms_consents'
          AND column_name = 'policy_id'
    )
    AND NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'compliance'
          AND table_name = 't_terms_consents'
          AND column_name = 'term_id'
    ) THEN
        ALTER TABLE compliance.t_terms_consents
        RENAME COLUMN policy_id  TO term_id;
    END IF;
END;
$$;

