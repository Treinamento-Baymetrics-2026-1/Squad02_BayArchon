DROP TRIGGER IF EXISTS registry_t_contracts_types_trg_log_contract_type_updated
ON registry.t_contracts_types;

CREATE TRIGGER registry_t_contracts_types_trg_log_contract_type_updated
AFTER UPDATE ON registry.t_contracts_types
FOR EACH ROW
WHEN(
    NEW.* IS DISTINCT FROM OLD.*
)
EXECUTE FUNCTION logs.fn_log_contract_type_updated();