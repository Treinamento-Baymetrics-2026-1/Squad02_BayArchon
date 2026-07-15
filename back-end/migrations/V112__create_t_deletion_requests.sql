CREATE TABLE IF NOT EXISTS documents.t_deletion_requests (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME deletion_requests_seq_id
    ),

    description             VARCHAR(3000)                                   NOT NULL,
    requested_at            TIMESTAMPTZ                                     NOT NULL        DEFAULT CURRENT_TIMESTAMP,
    situation               documents.e_situation_t_deletion_requests       NOT NULL        DEFAULT 'pending',
    reviewed_at             TIMESTAMPTZ                                         NULL        DEFAULT NULL,
    reviewed_comment        VARCHAR(3000)                                       NULL        DEFAULT NULL,
    is_cancelled            BOOLEAN                                         NOT NULL        DEFAULT FALSE,
    cancelled_at            TIMESTAMPTZ                                         NULL        DEFAULT NULL,
    reviewed_by             UUID                                                NULL        DEFAULT NULL,
    requested_by            UUID                                            NOT NULL,
    document_id             UUID                                            NOT NULL,

    -- Primary Key
    CONSTRAINT pk_deletion_requests
        PRIMARY KEY (id),

    -- Checks
    CONSTRAINT chk_deletion_requests_description
        CHECK (
            functions.fn_is_valid_text(description)
        ),

    CONSTRAINT chk_deletion_requests_cancelled
        CHECK (
            (is_cancelled = FALSE AND cancelled_at IS NULL)
            OR
            (is_cancelled = TRUE AND cancelled_at IS NOT NULL)
        ),

    -- Foreign Keys
    CONSTRAINT fk_deletion_requests_reviewed_by
        FOREIGN KEY (reviewed_by)
        REFERENCES registry.t_users(id),

    CONSTRAINT fk_deletion_requests_requested_by
        FOREIGN KEY (requested_by)
        REFERENCES registry.t_users(id),

    CONSTRAINT fk_deletion_requests_document
        FOREIGN KEY (document_id)
        REFERENCES documents.t_documents(id),

    CONSTRAINT chk_deletion_requests_review
    CHECK (
        (situation = 'pending' AND reviewed_at IS NULL AND reviewed_by IS NULL)
        OR
        (
            situation IN ('approved', 'rejected')
            AND reviewed_at IS NOT NULL
            AND reviewed_by IS NOT NULL
        )
    )
);