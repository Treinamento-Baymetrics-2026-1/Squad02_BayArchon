CREATE OR REPLACE FUNCTION functions.fn_is_valid_text(IN p_text TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
    RETURN (
        p_text IS NOT NULL
        AND char_length(p_text) >= 3
        AND p_text !~ '^\s'
        AND p_text !~ '\s$'
        AND p_text !~ '\s{2,}'
    );
END;
$$;