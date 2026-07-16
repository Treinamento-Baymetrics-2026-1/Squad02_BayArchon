CREATE TABLE IF NOT EXISTS documents.t_document_favorites (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME document_favorites_seq_id
    ),

    created_at      TIMESTAMPTZ     NOT NULL        DEFAULT CURRENT_TIMESTAMP,
    user_id         UUID            NOT NULL,
    document_id     UUID            NOT NULL,

    -- Primary Key
    CONSTRAINT pk_document_favorites
        PRIMARY KEY (id),

    -- Foreign Keys
    CONSTRAINT fk_document_favorites_user
        FOREIGN KEY (user_id)
        REFERENCES registry.t_users(id),

    CONSTRAINT fk_document_favorites_document
        FOREIGN KEY (document_id)
        REFERENCES documents.t_documents(id)

);