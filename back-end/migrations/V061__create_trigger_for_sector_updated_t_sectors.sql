DROP TRIGGER IF EXISTS registry_t_sectors_trg_log_updated
ON registry.t_sectors;

CREATE TRIGGER registry_t_sectors_trg_log_updated
AFTER UPDATE ON registry.t_sectors
FOR EACH ROW
WHEN(
    OLD.display_name IS DISTINCT FROM NEW.display_name
    OR OLD.details IS DISTINCT FROM NEW.details
)
EXECUTE FUNCTION logs.fn_log_sector_updated();