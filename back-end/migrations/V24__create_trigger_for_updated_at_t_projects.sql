DROP TRIGGER IF EXISTS registry_t_projects_trg_update_updated_at
ON registry.t_projects;

CREATE TRIGGER registry_t_projects_trg_update_updated_at
BEFORE UPDATE ON registry.t_projects
FOR EACH ROW
EXECUTE FUNCTION functions.fn_update_updated_at();