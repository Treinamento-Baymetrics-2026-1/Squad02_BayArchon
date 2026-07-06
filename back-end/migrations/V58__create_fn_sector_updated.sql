CREATE OR REPLACE FUNCTION logs.fn_log_sector_updated()
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
        type_logs,
        details
    )   VALUES (
        auth.uid(),
        'sector_updated',
        json_build_object(
            'new_display_name', NEW.display_name,
            'old_display_name', OLD.display_name,
            'new_details', NEW.details,
            'old_details', OLD.details  
        )
    );
    RETURN NEW;
END;
$$;
