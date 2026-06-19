CREATE TYPE registry.status_profiles AS ENUM(
    'created', 
    'active',
    'on_leave', 
    'terminated'
);
--Deixar idempotente