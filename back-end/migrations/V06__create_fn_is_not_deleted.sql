CREATE OR REPLACE FUNCTION functions.fn_is_not_deleted(
    p_is_deleted BOOLEAN,
    p_deleted_at TIMESTAMPTZ
)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
    RETURN (
        (p_is_deleted = FALSE AND p_deleted_at IS NULL)
        OR
        (p_is_deleted = TRUE AND p_deleted_at IS NOT NULL)
    );
END;
$$;