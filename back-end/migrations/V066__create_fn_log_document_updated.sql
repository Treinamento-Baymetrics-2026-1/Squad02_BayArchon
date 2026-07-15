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
          'old_extension', OLD.extension,

          'new_source', NEW.source,
          'old_source', OLD.source,

          'new_category_id', NEW.category_id,
          'old_category_id', OLD.category_id,

          'new_responsible_id', NEW.responsible_id,
          'old_responsible_id', OLD.responsible_id,

          'new_sector_id', NEW.sector_id,
          'old_sector_id', OLD.sector_id,

          'new_client_id', NEW.client_id,
          'old_client_id', OLD.client_id,

          'new_project_id', NEW.project_id,
          'old_project_id', OLD.project_id,

          'file_id', NEW.file_id,

           'updated_at', NEW.updated_at
          
        )
    );
    RETURN NEW;
END;
$$;
