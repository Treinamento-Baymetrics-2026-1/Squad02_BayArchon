CREATE TABLE IF NOT EXISTS registry.t_users(
    id              UUID						    NOT NULL,
    display_name    VARCHAR(150)                    NOT NULL,
    situation       registry.e_situation_t_users    NOT NULL    DEFAULT 'created',
    access_level    CHAR(1)                         NOT NULL    DEFAULT 'c',
    created_at      TIMESTAMPTZ                     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ                     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    deleted_at      TIMESTAMPTZ                         NULL    DEFAULT NULL,
    is_deleted      BOOLEAN                         NOT NULL    DEFAULT FALSE,
    sector_id       INTEGER                         NOT NULL,
    created_by      UUID                                NULL,

    --PRIMARY KEY
    CONSTRAINT pk_users PRIMARY KEY(id),

    --CHECK
    CONSTRAINT chk_users_name
        CHECK(functions.fn_is_valid_name(display_name)),

    CONSTRAINT chk_profiles_access_level
        CHECK(access_level IN('c','m','a')),
    
     CONSTRAINT chk_users_soft_deleted
        CHECK(
            functions.fn_is_not_deleted(
                is_deleted,
                deleted_at
            )
        ),

    --FOREIGN KEY
    CONSTRAINT fk_users
        FOREIGN KEY(id)
        REFERENCES auth.users(id),

    CONSTRAINT fk_users_sectors
        FOREIGN KEY(sector_id)
        REFERENCES registry.t_sectors(id),

    CONSTRAINT fk_users_created_by
        FOREIGN KEY(created_by)
        REFERENCES registry.t_users(id)

);
