CREATE TABLE IF NOT EXISTS documents.t_documents_access_histories (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME documents_access_histories_seq_id
    ),

    accessed_at         TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    document_id         UUID            NOT NULL,
    user_id             UUID            NOT NULL,

    -- Primary Key
    CONSTRAINT pk_documents_access_histories
        PRIMARY KEY (id),

    -- Foreign Keys
    CONSTRAINT fk_documents_access_histories_document
        FOREIGN KEY (document_id)
        REFERENCES documents.t_documents(id),

    CONSTRAINT fk_documents_access_histories_user
        FOREIGN KEY (user_id)
        REFERENCES registry.t_users(id)
);