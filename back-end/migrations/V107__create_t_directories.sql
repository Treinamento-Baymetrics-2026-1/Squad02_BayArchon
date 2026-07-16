CREATE TABLE IF NOT EXISTS documents.t_directories (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME directories_seq_id
    ),

    display_name    VARCHAR(200)    NOT NULL,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    has_password    BOOLEAN         NOT NULL DEFAULT FALSE,
    password_hash   VARCHAR(60)              DEFAULT NULL,
    is_deleted      BOOLEAN         NOT NULL DEFAULT FALSE,
    deleted_at      TIMESTAMPTZ              DEFAULT NULL,
    updated_by      UUID                    DEFAULT NULL,
    parent_id       INTEGER                 DEFAULT NULL,
    project_id      INTEGER         NOT NULL,
    created_by      UUID            NOT NULL,
    sector_id       INTEGER         NOT NULL,

    -- Primary Key
    CONSTRAINT pk_directories
        PRIMARY KEY (id),

    -- Checks
    CONSTRAINT chk_directories_display_name
        CHECK (
            functions.fn_is_valid_text(display_name)
        ),

    CONSTRAINT chk_directories_soft_delete
        CHECK (
            functions.fn_is_not_deleted(
                is_deleted,
                deleted_at
            )
        ),

    -- Foreign Keys
    CONSTRAINT fk_directories_parent
        FOREIGN KEY (parent_id)
        REFERENCES documents.t_directories(id),

    CONSTRAINT fk_directories_project
        FOREIGN KEY (project_id)
        REFERENCES registry.t_projects(id),

    CONSTRAINT fk_directories_created_by
        FOREIGN KEY (created_by)
        REFERENCES registry.t_users(id),

    CONSTRAINT fk_directories_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES registry.t_users(id),

    CONSTRAINT fk_directories_sector
        FOREIGN KEY (sector_id)
        REFERENCES registry.t_sectors(id)
);