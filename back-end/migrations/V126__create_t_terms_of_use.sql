CREATE TABLE IF NOT EXISTS compliance.t_terms_of_use (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME terms_of_use_seq_id
    ),

    title           VARCHAR(200)                NOT NULL,
    type            compliance.e_type_terms      NOT NULL,
    description     VARCHAR(3000)               NOT NULL,
    version_number  SMALLINT                    NOT NULL    DEFAULT 1,
    is_active       BOOLEAN                     NOT NULL    DEFAULT TRUE,
    created_at      TIMESTAMPTZ                 NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    created_by      UUID                        NOT NULL,

    -- Primary Key
    CONSTRAINT pk_terms_of_use
        PRIMARY KEY (id),

    -- Checks
    CONSTRAINT chk_terms_of_use_title
        CHECK (
            functions.fn_is_valid_text(title)
        ),

    CONSTRAINT chk_terms_of_use_description
        CHECK (
            functions.fn_is_valid_text(description)
        ),

    CONSTRAINT chk_terms_of_use_version_number
        CHECK (
            version_number > 0
        ),

    -- Foreign Key
    CONSTRAINT fk_terms_of_use_created_by
        FOREIGN KEY (created_by)
        REFERENCES registry.t_users(id)
);