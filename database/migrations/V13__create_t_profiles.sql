CREATE TABLE IF NOT EXISTS registry.profiles(
    id              UUID						NOT NULL,
    name            VARCHAR(150)                NOT NULL,
    status          registry.status_profiles    NOT NULL,
    access_level    CHAR(1)                     NOT NULL,
    created_at      TIMESTAMPTZ                 NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ                 NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    deleted_at      TIMESTAMPTZ                             DEFAULT NULL,
    is_deleted      BOOLEAN                     NOT NULL    DEFAULT FALSE,
    sector_id       INTEGER                     NOT NULL,

    CONSTRAINT pk_profiles PRIMARY KEY(id),

    CONSTRAINT chk_profiles_name
        CHECK(functions.name(name)),

    CONSTRAINT chk_profiles_access_level
        CHECK(access_level IN('c','m','a')),
    
    CONSTRAINT chk_profiles_created_at
        CHECK(created_at <= CURRENT_TIMESTAMP),

    CONSTRAINT chk_profiles_updated_at
        CHECK(updated_at <= CURRENT_TIMESTAMP),

    CONSTRAINT fk_profiles_users
        FOREIGN KEY(id)
        REFERENCES  auth.users(id),

    CONSTRAINT fk_profiles_sectors
        FOREIGN KEY(sector_id)
        REFERENCES registry.sectors(id)
);
