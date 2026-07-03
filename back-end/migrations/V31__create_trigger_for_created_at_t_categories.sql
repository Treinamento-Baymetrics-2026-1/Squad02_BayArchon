DROP TRIGGER IF EXISTS registry_t_categories_trg_is_valid_created_at
ON registry.t_categories;

CREATE TRIGGER registry_t_categories_trg_is_valid_created_at
BEFORE INSERT OR UPDATE ON registry.t_categories
FOR EACH ROW
EXECUTE FUNCTION functions.fn_is_valid_created_at();
