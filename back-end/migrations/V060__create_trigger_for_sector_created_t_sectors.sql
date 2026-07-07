DROP TRIGGER IF EXISTS registry_t_sectors_trg_log_sector_created
ON registry.t_sectors;

CREATE TRIGGER registry_t_sectors_trg_log_sector_created
AFTER INSERT ON registry.t_sectors
FOR EACH ROW
EXECUTE FUNCTION logs.fn_log_sector_created();