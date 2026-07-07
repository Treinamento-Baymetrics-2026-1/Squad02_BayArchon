CREATE OR REPLACE FUNCTION logs.fn_log_company_client_updated()
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
        'company_client_updated',
        json_build_object(
            'id', NEW.id,

            'new_display_name', NEW.display_name,
            'old_display_name', OLD.display_name,

            'new_is_enabled', NEW.is_enabled,
            'old_is_enabled', OLD.is_enabled,

            'new_cnpj', NEW.cnpj,
            'old_cnpj', OLD.cnpj,

            'new_email', NEW.email,
            'old_email', OLD.email
           
            'updated_at', NEW.updated_at
            
        )

    );
    RETURN NEW;
END;
$$;
