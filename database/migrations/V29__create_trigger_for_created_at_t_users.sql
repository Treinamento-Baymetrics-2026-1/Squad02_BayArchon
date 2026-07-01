DROP TRIGGER IF EXISTS registry_t_users_trg_is_valid_created_at
ON registry.t_users;

CREATE TRIGGER registry_t_users_trg_is_valid_created_at
BEFORE INSERT OR UPDATE ON registry.t_users
FOR EACH ROW
EXECUTE FUNCTION functions.fn_is_valid_created_at();