CREATE OR REPLACE FUNCTION logs.fn_log_company_client_is_enabled_changed_to_terminated()
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
        'company_client_is_enabled_changed_to_terminated',
        json_build_object(
            'id', NEW.id,
            'display_name', NEW.display_name,
            'new_is_enabled', NEW.is_enabled,
            'old_is_enabled', OLD.is_enabled,
            'updated_at', NEW.updated_at
            
        )

    );
    RETURN NEW;
END;
$$;
