CREATE OR REPLACE FUNCTION logs.fn_log_category_created()
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
        'category_created',
        json_build_object(
            'id', NEW.id,
            'display_name', NEW.display_name,
            'details', NEW.details,
            'created_at', NEW.created_at,
            'updated_at', NEW.updated_at

        )
    );
    RETURN NEW;
END;
$$;