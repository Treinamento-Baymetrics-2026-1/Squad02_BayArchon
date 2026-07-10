CREATE OR REPLACE FUNCTION logs.fn_log_contract_created()
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
        'contract_created',
        json_build_object(
            'id', NEW.id,
            'expected_due_date', NEW.expected_due_date,
            'details', NEW.details,
            'type_id', NEW.type_id,
            'client_id', NEW.client_id
        )
    );
    RETURN NEW;
END;
$$;