CREATE OR REPLACE FUNCTION logs.fn_log_project_updated()
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
        'project_updated',
        json_build_object(
            'id', NEW.id,
            
            'new_display_name', NEW.display_name,
            'old_display_name', OLD.display_name,

            'new_current_stage', NEW.current_stage,
            'old_current_stage', OLD.current_stage,

            'new_details', NEW.details,
            'old_details', OLD.details,

            'new_current_stage', NEW.current_stage,
            'old_current_stage', OLD.current_stage,

            'new_client_id', NEW.client_id,
            'old_client_id', OLD.client_id,

            'new_sector_id', NEW.sector_id,
            'old_sector_id', OLD.sector_id,

            'new_category_id', NEW.category_id,
            'old_category_id', OLD.category_id,

            'updated_at', NEW.updated_at
            
        )
    );
    RETURN NEW;
END;
$$;