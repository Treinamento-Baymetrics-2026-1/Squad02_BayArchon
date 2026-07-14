DROP TRIGGER IF EXISTS registry_t_projects_trg_log_created
ON registry.t_projects;

CREATE TRIGGER registry_t_projects_trg_log_created
AFTER INSERT ON registry.t_projects
FOR EACH ROW
EXECUTE FUNCTION logs.fn_log_project_created();