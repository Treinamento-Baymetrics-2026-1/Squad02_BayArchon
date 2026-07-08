DROP TRIGGER IF EXISTS registry_t_projects_trg_log_current_stage_changed_to_finished
ON registry.t_projects;

CREATE TRIGGER registry_t_projects_trg_log_current_stage_changed_to_finished
AFTER UPDATE ON registry.t_projects
FOR EACH ROW
WHEN(
    OLD.current_stage = 'p'
    AND NEW.current_stage = 'f'
)
EXECUTE FUNCTION logs.fn_log_project_current_stage_changed_to_finished();