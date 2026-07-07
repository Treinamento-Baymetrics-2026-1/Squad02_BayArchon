DROP TRIGGER IF EXISTS registry_t_projects_trg_log_project_updated
ON registry.t_projects;

CREATE TRIGGER registry_t_projects_trg_log_project_updated
AFTER UPDATE ON registry.t_projects
FOR EACH ROW
WHEN(OLD.* IS DISTINCT FROM NEW.*)
EXECUTE FUNCTION logs.fn_log_project_updated();