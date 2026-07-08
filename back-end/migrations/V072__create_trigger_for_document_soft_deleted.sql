DROP TRIGGER IF EXISTS documents_t_documents_trg_log_soft_deleted
ON documents.t_documents;

CREATE TRIGGER documents_t_documents_trg_log_soft_deleted
AFTER UPDATE ON documents.t_documents
FOR EACH ROW
WHEN(
     OLD.is_deleted = FALSE
        AND NEW.is_deleted = TRUE 
        AND OLD.deleted_at IS NULL
        AND NEW.deleted_at IS NOT NULL
)    
EXECUTE FUNCTION logs.fn_log_document_deleted();