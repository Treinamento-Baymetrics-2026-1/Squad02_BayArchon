CREATE OR REPLACE FUNCTION logs.fn_log_project_current_stage_changed_to_in_progress()
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
        'project_current_stage_changed_to_in_progress',
        json_build_object(
            'id', NEW.id,
            'display_name', NEW.display_name,
            'new_current_stage', NEW.current_stage,
            'old_current_stage', OLD.current_stage,
            'updated_at', NEW.updated_at,
            'client_id', NEW.client_id,
            'sector_id', NEW.sector_id,
            'category_id', NEW.category_id
            
        )
    );
    RETURN NEW;
END;
$$;