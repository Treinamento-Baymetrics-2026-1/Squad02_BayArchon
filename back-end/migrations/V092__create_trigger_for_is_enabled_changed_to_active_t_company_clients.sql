DROP TRIGGER IF EXISTS registry_t_company_clients_trg_log_is_enabled_changed_to_a
ON registry.t_companies_clients;

CREATE TRIGGER registry_t_company_clients_trg_log_is_enabled_changed_to_a
AFTER UPDATE ON registry.t_companies_clients
FOR EACH ROW
WHEN(
    NEW.is_enabled = 'A'
    AND OLD.is_enabled = 'T'
)
EXECUTE FUNCTION logs.fn_log_company_client_is_enabled_changed_to_active()