CREATE TABLE IF NOT EXISTS documents.t_documents_versions (
    id                  UUID                                            NOT NULL    DEFAULT gen_random_uuid(),
    version_number      SMALLINT                                        NOT NULL,
    extension           documents.e_extension_t_documents_versions      NOT NULL,
    description         VARCHAR(500)                                        NULL    DEFAULT NULL,
    size                INTEGER                                         NOT NULL,
    created_at          TIMESTAMPTZ                                     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    file_id             UUID                                            NOT NULL,
    document_id         UUID                                            NOT NULL,
    created_by          UUID                                            NOT NULL,

    -- Primary Key
    CONSTRAINT pk_documents_versions
        PRIMARY KEY (id),

    -- Checks
    CONSTRAINT chk_documents_versions_version_number
        CHECK (version_number > 0),

    CONSTRAINT chk_documents_versions_size
        CHECK (size > 0),

    CONSTRAINT chk_documents_versions_description
        CHECK (
            description IS NULL
            OR functions.fn_is_valid_text(description)
        ),

    -- Foreign Keys
    CONSTRAINT fk_documents_versions_file
        FOREIGN KEY (file_id)
        REFERENCES storage.objects(id),

    CONSTRAINT fk_documents_versions_document
        FOREIGN KEY (document_id)
        REFERENCES documents.t_documents(id),

    CONSTRAINT fk_documents_versions_created_by
        FOREIGN KEY (created_by)
        REFERENCES registry.t_users(id)

);