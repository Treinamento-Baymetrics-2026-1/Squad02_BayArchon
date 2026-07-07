DROP TRIGGER IF EXISTS registry_t_contracts_trg_log_contract_created
ON registry.t_contracts;

CREATE TRIGGER registry_t_contracts_trg_log_contract_created
AFTER INSERT ON registry.t_contracts
FOR EACH ROW
EXECUTE FUNCTION logs.fn_log_contract_created();