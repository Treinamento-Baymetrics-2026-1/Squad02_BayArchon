DROP TRIGGER IF EXISTS registry_t_contracts_trg_log_updated
ON registry.t_contracts;

CREATE TRIGGER registry_t_contracts_trg_log_updated
AFTER UPDATE ON registry.t_contracts
FOR EACH ROW
WHEN(
    NEW.* IS DISTINCT FROM OLD.*
)
EXECUTE FUNCTION logs.fn_log_contract_updated();