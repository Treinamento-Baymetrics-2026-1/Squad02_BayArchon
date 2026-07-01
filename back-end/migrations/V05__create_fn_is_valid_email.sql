CREATE OR REPLACE FUNCTION functions.fn_is_valid_email(p_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
IMMUTABLE
AS $$
SELECT
    p_email IS NOT NULL
    AND length(trim(p_email)) BETWEEN 5 AND 320
    AND p_email !~ '\s'
    AND p_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
$$;