DROP TRIGGER IF EXISTS registry_t_categories_trg_log_category_created
ON registry.t_categories;

CREATE TRIGGER registry_t_categories_trg_log_category_created
AFTER INSERT ON registry.t_categories
FOR EACH ROW
EXECUTE FUNCTION logs.fn_log_category_created();