DROP TRIGGER IF EXISTS documents_t_contracts_trg_update_updated_at
ON documents.t_contracts;

CREATE TRIGGER documents_t_contracts_trg_update_updated_at
BEFORE UPDATE ON documents.t_contracts
FOR EACH ROW
EXECUTE FUNCTION functions.fn_update_updated_at();