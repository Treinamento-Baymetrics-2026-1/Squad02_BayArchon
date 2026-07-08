DROP TRIGGER IF EXISTS documents_t_documents_trg_log_updated
ON documents.t_documents;

CREATE TRIGGER documents_t_documents_trg_log_updated
AFTER UPDATE ON documents.t_documents
FOR EACH ROW
WHEN(OLD.* IS DISTINCT FROM NEW.*)    
EXECUTE FUNCTION logs.fn_log_document_updated();