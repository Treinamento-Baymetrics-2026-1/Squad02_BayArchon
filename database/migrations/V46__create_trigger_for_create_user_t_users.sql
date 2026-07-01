DROP TRIGGER IF EXISTS registry_t_users_trg_log_user_created
ON registry.t_users;

CREATE TRIGGER registry_t_users_trg_log_user_created
AFTER INSERT ON registry.t_users
FOR EACH ROW
EXECUTE FUNCTION logs.fn_log_user_created();
