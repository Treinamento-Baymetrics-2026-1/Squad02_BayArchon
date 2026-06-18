CREATE OR REPLACE FUNCTION functions.email(IN p_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN(
        p_email LIKE '_%@%._%' 
        AND p_email ~* '^[A-Z0-9._%+-]{1,64}@[A-Z0-9.-]{1,255}\.[A-Z]{2,}$'
    );
END;
$$;