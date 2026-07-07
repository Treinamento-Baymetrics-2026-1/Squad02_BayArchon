CREATE OR REPLACE FUNCTION logs.fn_log_category_updated()
RETURNS TRIGGER
LANGUAGE plpgsql
VOLATILE
PARALLEL UNSAFE
SECURITY INVOKER
COST 1
SET search_path = logs, pg_catalog
AS $$
BEGIN
    INSERT INTO logs.t_logs(
        performed_by,
        type_logs,
        details
    )   VALUES(
        auth.uid(),
        'category_updated',
        json_build_object(
            'id', NEW.id,
            'new_display_name', NEW.display_name,
            'old_display_name', OLD.display_name,

            'new_details', NEW.details,
            'old_details', OLD.details,

            'created_at', NEW.created_at,
            'updated_at', NEW.updated_at,
            
        )
    );
    RETURN NEW;
END;
$$;