CREATE OR REPLACE FUNCTION logs.fn_log_user_deleted()
RETURNS TRIGGER
LANGUAGE plpgsql
VOLATILE
PARALLEL UNSAFE
SECURITY INVOKER
COST 1
SET search_path = logs, pg_catalog
AS $$
BEGIN
    IF OLD.is_deleted = FALSE
        AND NEW.is_deleted = TRUE
        AND OLD.deleted_at IS NULL
        AND NEW.deleted_at IS NOT NULL 
        THEN

        INSERT INTO logs.t_logs (
            performed_by,
            target_user,
            action_type,
            details
        )
        VALUES (
            NEW.created_by,
            NEW.id,
            'user_soft_deleted',
            json_build_object(
                'display_name', NEW.display_name,
                'situation', NEW.situation ,      
                'access_level', NEW.access_level,
                'created_at', NEW.created_at, 
                'updated_at', NEW.updated_at, 
                'sector_id', NEW.sector_id    
            )
        );
        
    END IF;

    RETURN NEW;
END;
$$;