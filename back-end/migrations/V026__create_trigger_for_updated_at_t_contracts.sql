DROP TRIGGER IF EXISTS registry_t_contracts_trg_update_updated_at
ON registry.t_contracts;

CREATE TRIGGER registry_t_contracts_trg_update_updated_at
BEFORE UPDATE ON registry.t_contracts
FOR EACH ROW
EXECUTE FUNCTION functions.fn_update_updated_at();