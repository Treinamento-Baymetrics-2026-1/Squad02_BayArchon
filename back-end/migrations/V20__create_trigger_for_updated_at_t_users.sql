DROP TRIGGER IF EXISTS registry_t_users_trg_update_updated_at
ON registry.t_users;

CREATE TRIGGER registry_t_users_trg_update_updated_at
BEFORE UPDATE ON registry.t_users
FOR EACH ROW
EXECUTE FUNCTION functions.fn_update_updated_at();