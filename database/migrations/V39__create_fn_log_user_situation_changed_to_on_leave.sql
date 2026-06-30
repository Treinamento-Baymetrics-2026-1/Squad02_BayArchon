CREATE OR REPLACE FUNCTION logs.fn_log_user_situation_changed_to_on_leave()
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
       AND NEW.situation  = 'on_leave' THEN

        INSERT INTO logs.t_logs (
            performed_by,
            target_user,
            action_type,
            details
        )
        VALUES (
            NEW.created_by,
            NEW.id,
            'user_situation_changed_to_on_leave',
            json_build_object(
                'old_situation', OLD.situation ,
                'new_situation', NEW.situation ,
                'updated_at', NEW.updated_at
            )
        );

    END IF;

    RETURN NEW;
END;
$$;