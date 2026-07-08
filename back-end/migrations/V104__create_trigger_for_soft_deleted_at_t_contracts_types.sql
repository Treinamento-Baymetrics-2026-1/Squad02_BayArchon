DROP TRIGGER IF EXISTS registry_t_contracts_types_trg_log_soft_deleted
ON registry.t_contracts_types;

CREATE TRIGGER registry_t_contracts_types_trg_log_soft_deleted
AFTER UPDATE ON registry.t_contracts_types
FOR EACH ROW
WHEN(
    OLD.is_deleted = FALSE
        AND NEW.is_deleted = TRUE 
        AND OLD.deleted_at IS NULL
        AND NEW.deleted_at IS NOT NULL
)
EXECUTE FUNCTION logs.fn_log_contract_type_deleted();