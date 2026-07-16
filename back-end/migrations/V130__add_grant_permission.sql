-- ============================================================
-- Concede ao service_role acesso às tabelas da aplicação.
-- Inclui permissões para objetos existentes e futuros.
-- ============================================================

-- SCHEMAS

GRANT USAGE ON SCHEMA
    registry,
    documents,
    notifications,
    compliance,
    ia,
    logs,
    functions
TO service_role;

-- TABELAS EXISTENTES

-- Registry
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA registry
TO service_role;

-- Documents
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA documents
TO service_role;

-- Notifications
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA notifications
TO service_role;

-- Compliance
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA compliance
TO service_role;

-- IA
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA ia
TO service_role;

-- Logs (somente gravação)
GRANT INSERT
ON ALL TABLES IN SCHEMA logs
TO service_role;

-- FUNÇÕES EXISTENTES

GRANT EXECUTE
ON ALL FUNCTIONS IN SCHEMA functions
TO service_role;

-- SEQUENCES EXISTENTES

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA registry
TO service_role;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA documents
TO service_role;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA notifications
TO service_role;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA compliance
TO service_role;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA ia
TO service_role;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA logs
TO service_role;

-- ============================================================
-- PERMISSÕES PADRÃO PARA OBJETOS FUTUROS
-- (executar como o mesmo usuário que cria os objetos)
-- ============================================================

-- Registry

ALTER DEFAULT PRIVILEGES IN SCHEMA registry
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA registry
GRANT USAGE, SELECT ON SEQUENCES TO service_role;

-- Documents

ALTER DEFAULT PRIVILEGES IN SCHEMA documents
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA documents
GRANT USAGE, SELECT ON SEQUENCES TO service_role;

-- Notifications

ALTER DEFAULT PRIVILEGES IN SCHEMA notifications
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA notifications
GRANT USAGE, SELECT ON SEQUENCES TO service_role;

-- Compliance

ALTER DEFAULT PRIVILEGES IN SCHEMA compliance
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA compliance
GRANT USAGE, SELECT ON SEQUENCES TO service_role;

-- IA

ALTER DEFAULT PRIVILEGES IN SCHEMA ia
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA ia
GRANT USAGE, SELECT ON SEQUENCES TO service_role;

-- Logs

ALTER DEFAULT PRIVILEGES IN SCHEMA logs
GRANT INSERT ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA logs
GRANT USAGE, SELECT ON SEQUENCES TO service_role;

-- Functions

ALTER DEFAULT PRIVILEGES IN SCHEMA functions
GRANT EXECUTE ON FUNCTIONS TO service_role;