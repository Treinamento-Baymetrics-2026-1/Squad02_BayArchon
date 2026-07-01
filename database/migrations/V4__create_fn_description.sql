CREATE OR REPLACE FUNCTION functions.description(IN p_description TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN(
        AND length(trim(p_description)) >= 3
        AND p_description !~ '  '
    );
END;
$$;
