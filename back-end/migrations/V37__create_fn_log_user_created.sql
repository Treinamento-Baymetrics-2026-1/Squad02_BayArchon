CREATE OR REPLACE FUNCTION logs.fn_log_user_created()
RETURNS TRIGGER
LANGUAGE plpgsql
VOLATILE
PARALLEL UNSAFE
SECURITY INVOKER
COST 1
SET search_path = logs, pg_catalog
AS $$
BEGIN
    INSERT INTO logs.t_logs (
        performed_by,
        target_user,
        action_type,
        details
    )   VALUES (
        NEW.created_by,
        NEW.id,
        'user_created',
        json_build_object(
            'display_name', NEW.display_name,
            'situation', NEW.is_enabled,      
            'access_level', NEW.access_level,
            'created_at', NEW.created_at, 
            'sector_id', NEW.sector_id       
        )
    );
    RETURN NEW;
END;
$$;
