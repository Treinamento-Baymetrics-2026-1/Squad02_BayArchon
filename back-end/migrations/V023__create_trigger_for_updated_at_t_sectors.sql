DROP TRIGGER IF EXISTS registry_t_sectors_trg_update_updated_at
ON registry.t_sectors;

CREATE TRIGGER registry_t_sectors_trg_update_updated_at
BEFORE UPDATE ON registry.t_sectors
FOR EACH ROW
EXECUTE FUNCTION functions.fn_update_updated_at();