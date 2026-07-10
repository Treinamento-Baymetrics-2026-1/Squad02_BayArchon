CREATE OR REPLACE FUNCTION functions.fn_is_valid_text(IN p_text TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
    v_clean TEXT;
BEGIN
    IF p_text IS NULL THEN
        RETURN FALSE;
    END IF;

    v_clean := btrim(regexp_replace(p_text, '\s+', ' ', 'g'));

    RETURN length(v_clean) >= 3;
END;
$$;