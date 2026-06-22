CREATE UNIQUE INDEX IF NOT EXISTS system_t_profiles_idxpt_name
ON registry.profiles
USING btree (name)
WHERE is_deleted = FALSE;