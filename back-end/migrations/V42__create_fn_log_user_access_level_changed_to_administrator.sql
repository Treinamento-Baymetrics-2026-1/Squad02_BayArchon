CREATE OR REPLACE FUNCTION logs.fn_log_user_access_level_changed_to_administrator()
RETURNS TRIGGER
LANGUAGE plpgsql
VOLATILE
PARALLEL UNSAFE
SECURITY INVOKER
COST 1
SET search_path = logs, pg_catalog
AS $$
BEGIN
    IF OLD.access_level IS DISTINCT FROM NEW.access_level
       AND NEW.access_level = 'A' THEN

        INSERT INTO logs.t_logs (
            performed_by,
            target_user,
            action_type,
            details
        )
        VALUES (
            NEW.created_by,
            NEW.id,
            'user_is_access_level_changed_to_administrator',
            json_build_object(
                'old_access_level', OLD.access_level,
                'new_access_level', NEW.access_level,
                'updated_at', NEW.updated_at
            )
        );

    END IF;

    RETURN NEW;
END;
$$;