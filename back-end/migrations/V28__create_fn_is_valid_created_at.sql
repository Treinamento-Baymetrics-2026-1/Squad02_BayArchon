CREATE OR REPLACE FUNCTION functions.fn_is_valid_created_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.created_at > CURRENT_TIMESTAMP THEN
            RAISE EXCEPTION 'created_at cannot be in the future';
        END IF;
    ELSE
        IF NEW.created_at <> OLD.created_at THEN
            RAISE EXCEPTION 'created_at cannot be modified';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;