CREATE OR REPLACE FUNCTION logs.fn_log_contract_updated()
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
        'contract_updated',
        json_build_object(
            'id', NEW.id,

            'new_expected_due_date', NEW.expected_due_date,
            'old_expected_due_date', OLD.expected_due_date,

            'new_details', NEW.details,
            'old_details', OLD.details,

            'new_type_id', NEW.type_id,
            'old_type_id', OLD.type_id,

            'new_client_id', NEW.client_id,
            'old_client_id', OLD.client_id,

            'updated_at', NEW.updated_at
        )
    );
    RETURN NEW;
END;
$$;