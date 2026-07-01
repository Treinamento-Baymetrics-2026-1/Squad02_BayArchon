DROP TRIGGER IF EXISTS registry_t_categories_trg_update_updated_at
ON registry.t_categories;

CREATE TRIGGER registry_t_categories_trg_update_updated_at
BEFORE UPDATE ON registry.t_categories
FOR EACH ROW
EXECUTE FUNCTION functions.fn_update_updated_at();