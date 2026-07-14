DROP TRIGGER IF EXISTS registry_t_users_trg_log_name_changed
ON registry.t_users;

CREATE TRIGGER registry_t_users_trg_log_name_changed
AFTER UPDATE ON registry.t_users
FOR EACH ROW
EXECUTE FUNCTION logs.fn_log_user_changed_name();
