CREATE OR REPLACE FUNCTION logs.fn_log_sector_soft_deleted()
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
        'sector_deleted',
        json_build_object(
            'id', NEW.id,
            'display_name', NEW.display_name,
            'details', NEW.details,
            'deleted_at', NEW.deleted_at,
            'is_deleted', NEW.is_deleted  
            
        )
    );
    RETURN NEW;
END;
$$;
