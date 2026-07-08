CREATE OR REPLACE FUNCTION logs.fn_log_company_client_created()
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
        'company_client_created',
        json_build_object(
            'id', NEW.id,
            'display_name', NEW.display_name,
            'is_enabled', NEW.is_enabled,
            'cnpj', NEW.cnpj,
            'email', NEW.email,
            'created_at', NEW.created_at
        )
    );
    RETURN NEW;
END;
$$;