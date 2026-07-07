CREATE OR REPLACE FUNCTION logs.fn_log_document_updated()
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
        performed_by,
        type_logs,
        details
    )   VALUES(
        auth.uid(),
        'document_updated',
        json_build_object(
          'id', NEW.id,

          'new_title', NEW.title,
          'old_title', OLD.title,

          'new_visibility', NEW.visibility,
          'old_visibility', OLD.visibility,

          'new_extension', NEW.extension,
          'old_extension', NEW.extension,

          'new_source', NEW.source,
          'old_source', NEW.source,

          'created_at', NEW.created_at,
          'updated_at', NEW.updated_at,

          'new_category_id', NEW.category_id,
          'old_category_id', NEW.category_id,

          'new_responsible_id', NEW.responsible_id,
          'old_responsible_id', NEW.responsible_id,

          'new_sector_id', NEW.sector_id,
          'old_sector_id', NEW.sector_id,

          'new_client_id', NEW.client_id,
          'old_client_id', NEW.client_id,

          'new_project_id', NEW.project_id,
          'old_project_id', NEW.project_id,

          'file_id', NEW.file_id
          
        )
    );
    RETURN NEW;
END;
$$;
