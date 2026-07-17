CREATE OR REPLACE FUNCTION functions.fn_is_valid_name(IN p_name TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
    RETURN (
        p_name IS NOT NULL
        AND length(p_name) >= 3
        AND p_name !~ '^ '
        AND p_name !~ ' $'
        AND p_name !~ '  '
        AND p_name ~ '^[A-Za-zÀ-ÿ]+( [A-Za-zÀ-ÿ]+)*$'
    );
END;
$$;