DROP TRIGGER IF EXISTS registry_t_company_clients_trg_log_company_client_updated
ON registry.t_companies_clients;

CREATE TRIGGER registry_t_company_clients_trg_log_company_client_updated
AFTER UPDATE ON registry.t_companies_clients
FOR EACH ROW
WHEN(NEW.* IS DISTINCT FROM OLD.*)
EXECUTE FUNCTION logs.fn_log_company_client_updated()