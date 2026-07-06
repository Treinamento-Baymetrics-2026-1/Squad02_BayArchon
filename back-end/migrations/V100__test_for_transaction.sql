CREATE OR REPLACE FUNCTION functions.fn_create_user(
    p_id UUID,
    p_email VARCHAR(255),
    p_display_name VARCHAR(150),
    p_access_level CHAR(1),
    p_sector_id INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN

    INSERT INTO auth.users (
        id,
        email
    )
    VALUES (
        p_id,
        p_email
    );

    INSERT INTO registry.t_users (
        id,
        display_name,
        situation,
        access_level,
        created_at,
        is_deleted,
        sector_id
    )
    VALUES (
        p_id,
        p_display_name,
        'created',
        p_access_level,
        NOW(),
        FALSE,
        p_sector_id
    );

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error on creating user: %', SQLERRM;
END;
$$;