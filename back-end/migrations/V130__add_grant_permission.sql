-- Concede ao service_role o acesso necessário para executar operações
-- diretamente nas tabelas da aplicação via Supabase JS (sem RPC).

-- Acesso aos schemas.
GRANT USAGE ON SCHEMA
    registry,
    documents,
    notifications,
    compliance,
    ia,
    logs,
    functions
TO service_role;

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

-- Logs (normalmente apenas INSERT)
GRANT INSERT
ON ALL TABLES IN SCHEMA logs
TO service_role;

-- Uso das funções
GRANT EXECUTE
ON ALL FUNCTIONS IN SCHEMA functions
TO service_role;

-- Uso dos tipos ENUM
GRANT USAGE
ON ALL TYPES IN SCHEMA registry,
                 documents,
                 notifications,
                 compliance,
                 ia
TO service_role;

--Uso das sequences
GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA registry,
                           documents,
                           notifications,
                           compliance,
                           ia,
                           logs
TO service_role;