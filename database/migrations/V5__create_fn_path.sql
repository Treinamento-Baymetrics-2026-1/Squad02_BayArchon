CREATE OR REPLACE FUNCTION functions.path(p_path TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (
        p_path ~* '^[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/[a-zA-Z0-9._-]+\.(pdf|doc|docx|xls|xlsx|txt)$'
    );
END;
$$;

--Confirmar os tipos de extensoes, e como funciona o caminho (diretorios/arquivos, etc)