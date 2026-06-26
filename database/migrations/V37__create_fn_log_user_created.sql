CREATE OR REPLACE FUNCTION logs.fn_log_user_created()
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
        created_by,
        created_for,
        action_type,
        details
    )   VALUES (
        NEW.id,
        NEW.id,
        'user_created',
        json_build_object(
            'display_name', NEW.display_name,
            'is_enabled', NEW.is_enabled,      
            'access_level', NEW.access_level,
            'created_at', NEW.created_at, --Se é um log de criação, ainda é necessario?
            'updated_at', NEW.updated_at, --Mesmo de cima
            'deleted_at', NEW.deleted_at, --Se foi criado, vai ser NULL, é necessario?    
            'is_deleted', NEW.is_deleted, --Mesmo de cima, aqui vai ser FALSE
            'sector_id', NEW.sector_id       
        )
    );
    RETURN NEW;
END;
$$;

--Como fica os dados que vão para auth.users?