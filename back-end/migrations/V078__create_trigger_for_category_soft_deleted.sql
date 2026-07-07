DROP TRIGGER IF EXISTS registry_t_categories_trg_log_category_soft_deleted
ON registry.t_categories;

CREATE TRIGGER registry_t_categories_trg_log_category_soft_deleted
AFTER UPDATE registry.t_categories
FOR EACH ROW
WHEN(
    OLD.is_deleted = FALSE
        AND NEW.is_deleted = TRUE 
        AND OLD.deleted_at IS NULL
        AND NEW.deleted_at IS NOT NULL
)
EXECUTE FUNCTION logs.fn_log_category_soft_deleted();