DROP TRIGGER IF EXISTS registry_t_projects_trg_log_project_current_stage_changed_to_p
ON registry.t_projects;

CREATE TRIGGER registry_t_projects_trg_log_project_current_stage_changed_to_p
AFTER UPDATE ON registry.t_projects
FOR EACH ROW
WHEN(
    OLD.current_stage = 'c'
    AND NEW.current_stage = 'p'
)
EXECUTE FUNCTION logs.fn_log_project_current_stage_changed_to_in_progress();