DROP TRIGGER IF EXISTS documents_t_documents_trg_log_document_visibility_changed_to_pu
ON documents.t_documents;

CREATE TRIGGER documents_t_documents_trg_log_document_visibility_changed_to_pu
AFTER UPDATE ON documents.t_documents
FOR EACH ROW
WHEN(
    OLD.visibility = 'private' 
    AND NEW.visibility = 'public'
)
EXECUTE FUNCTION logs.fn_log_document_visibility_changed_to_public();