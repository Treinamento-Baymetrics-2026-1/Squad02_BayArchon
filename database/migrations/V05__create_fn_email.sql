CREATE OR REPLACE FUNCTION functions.email(p_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
AS $$
    SELECT
        p_email IS NOT NULL
        AND length(trim(p_email)) BETWEEN 5 AND 320
        AND p_email !~ '\s'
        AND p_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
$$;