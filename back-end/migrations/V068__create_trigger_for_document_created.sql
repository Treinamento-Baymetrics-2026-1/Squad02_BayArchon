DROP TRIGGER IF EXISTS documents_t_documents_trg_log_created
ON documents.t_documents;

CREATE TRIGGER documents_t_documents_trg_log_created
AFTER INSERT ON documents.t_documents
FOR EACH ROW
EXECUTE FUNCTION logs.fn_log_document_created();