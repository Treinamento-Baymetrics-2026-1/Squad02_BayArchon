CREATE TABLE IF NOT EXISTS registry.t_users(
    id              UUID						NOT NULL,
    display_name    VARCHAR(150)                NOT NULL,
    is_enabled      registry.e_is_enabled_t_users  NOT NULL,
    access_level    CHAR(1)                     NOT NULL,
    created_at      TIMESTAMPTZ                 NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ                 NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    deleted_at      TIMESTAMPTZ                             DEFAULT NULL,
    is_deleted      BOOLEAN                     NOT NULL    DEFAULT FALSE,
    sector_id       INTEGER                     NOT NULL,

    --PRIMARY KEY
    CONSTRAINT pk_profiles PRIMARY KEY(id),

    --CHECK
    CONSTRAINT chk_profiles_name
        CHECK(functions.fn_is_valid_name(display_name)),

    CONSTRAINT chk_profiles_access_level
        CHECK(access_level IN('c','m','a')),
    
     CONSTRAINT chk_users_soft_delete
        CHECK(
            functions.fn_is_not_deleted(
                is_deleted,
                deleted_at
            )
        ),

    --FOREIGN KEY
    CONSTRAINT fk_profiles_users
        FOREIGN KEY(id)
        REFERENCES auth.users(id),

    CONSTRAINT fk_profiles_sectors
        FOREIGN KEY(sector_id)
        REFERENCES registry.sectors(id),

   
);
