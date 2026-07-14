DROP TRIGGER IF EXISTS registry_t_company_clients_trg_log_is_enabled_changed_to_t
ON registry.t_companies_clients;

CREATE TRIGGER registry_t_company_clients_trg_log_is_enabled_changed_to_t
AFTER UPDATE ON registry.t_companies_clients
FOR EACH ROW
WHEN(
    NEW.is_enabled = 'T'
    AND OLD.is_enabled = 'A'
)
EXECUTE FUNCTION logs.fn_log_company_client_is_enabled_changed_to_terminated()