CREATE OR REPLACE FUNCTION logs.fn_log_user_changed_name()
RETURNS TRIGGER
LANGUAGE plpgsql
VOLATILE
PARALLEL UNSAFE
SECURITY INVOKER
COST 1
SET search_path = logs, pg_catalog
AS $$
BEGIN
    IF OLD.display_name IS DISTINCT FROM NEW.display_name
    THEN
        INSERT INTO logs.t_logs (
            performed_by,
            target_user,
            action_type,
            details
        )
        VALUES (
            NEW.created_by,
            NEW.id,
            'user_changed_name',
            json_build_object(
                'old_display_name', OLD.display_name,
                'new_display_name', NEW.display_name,
                'updated_at', NEW.updated_at
            )
        );

    END IF;

    RETURN NEW;
END;
$$;