DROP TRIGGER IF EXISTS documents_t_documents_trg_log_visibility_changed_to_pr
ON documents.t_documents;

CREATE TRIGGER documents_t_documents_trg_log_visibility_changed_to_pr
AFTER UPDATE ON documents.t_documents
FOR EACH ROW
WHEN(
    OLD.visibility = 'public' 
    AND NEW.visibility = 'private'
)
EXECUTE FUNCTION logs.fn_log_document_visibility_changed_to_private();