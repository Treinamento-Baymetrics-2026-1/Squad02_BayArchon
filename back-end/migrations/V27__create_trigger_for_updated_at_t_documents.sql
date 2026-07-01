DROP TRIGGER IF EXISTS documents_t_documents_trg_update_updated_at
ON documents.t_documents;

CREATE TRIGGER documents_t_documents_trg_update_updated_at
BEFORE UPDATE ON documents.t_documents
FOR EACH ROW
EXECUTE FUNCTION functions.fn_update_updated_at();