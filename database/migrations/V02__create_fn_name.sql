CREATE OR REPLACE FUNCTION functions.name(IN p_name TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN(
        trim(p_name) ~ '^[A-Za-zÀ-ÿ]+( [A-Za-zÀ-ÿ]+)*$'
        AND length(trim(p_name)) >= 3
        AND p_name !~ '  '
    );
END;
$$;

