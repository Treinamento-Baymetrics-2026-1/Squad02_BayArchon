DROP TRIGGER IF EXISTS documents_t_documents_trg_is_valid_created_at
ON documents.t_documents;

CREATE TRIGGER documents_t_documents_trg_is_valid_created_at
BEFORE INSERT OR UPDATE ON documents.t_documents
FOR EACH ROW
EXECUTE FUNCTION functions.fn_is_valid_created_at();