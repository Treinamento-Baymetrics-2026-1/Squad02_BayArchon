CREATE OR REPLACE FUNCTION logs.fn_log_user_situation_changed_to_active()
RETURNS TRIGGER
LANGUAGE plpgsql
VOLATILE
PARALLEL UNSAFE
SECURITY INVOKER
COST 1
SET search_path = logs, pg_catalog
AS $$
BEGIN
    IF OLD.situation  IS DISTINCT FROM NEW.situation 
       AND NEW.situation  = 'active' THEN

        INSERT INTO logs.t_logs (
            performed_by,
            user_changed,
            type_logs,
            details
        )
        VALUES (
            auth.uid(),
            NEW.id,
            'user_situation_changed_to_active',
            json_build_object(
                'old_situation', OLD.situation,
                'new_situation', NEW.situation,
                'updated_at', NEW.updated_at
            )
        );

    END IF;

    RETURN NEW;
END;
$$;