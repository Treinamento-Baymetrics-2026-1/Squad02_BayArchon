CREATE OR REPLACE FUNCTION logs.fn_log_document_created
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
        'document_created',
        json_build_object(
          'id', NEW.id,
          'title', NEW.title,
          'visibility', NEW.visibility,
          'extension', NEW.extension,
          'source', NEW.source,
          'created_at', NEW.created_at,
          'updated_at', NEW.updated_at, 
          'category_id', NEW.category_id,
          'responsible_id', NEW.responsible_id,
          'sector_id', NEW.sector_id,
          'client_id', NEW.client_id,
          'project_id', NEW.project_id,
          'file_id', NEW.file_id
          
        )
    );
    RETURN NEW;
END;
$$;
