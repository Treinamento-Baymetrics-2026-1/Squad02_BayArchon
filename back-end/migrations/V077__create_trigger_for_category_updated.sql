DROP TRIGGER IF EXISTS registry_t_categories_trg_log_updated
ON registry.t_categories;

CREATE TRIGGER registry_t_categories_trg_log_updated
AFTER UPDATE ON registry.t_categories
FOR EACH ROW
WHEN(OLD.* IS DISTINCT FROM NEW.*)
EXECUTE FUNCTION logs.fn_log_category_updated();