CREATE TABLE IF NOT EXISTS documents.t_directory_access_attempts (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME directory_access_attempts_seq_id
    ),

    failed_attempts    INTEGER     NOT NULL         DEFAULT 0,
    blocked_until      TIMESTAMPTZ     NULL         DEFAULT NULL,
    last_attempt_at    TIMESTAMPTZ     NULL         DEFAULT NULL,
    directory_id       INTEGER     NOT NULL,
    user_id            UUID        NOT NULL,

    -- Primary Key
    CONSTRAINT pk_directory_access_attempts
        PRIMARY KEY (id),

    -- Checks
    CONSTRAINT chk_directory_access_attempts_failed_attempts
        CHECK (failed_attempts >= 0),

    -- Foreign Keys
    CONSTRAINT fk_directory_access_attempts_directory
        FOREIGN KEY (directory_id)
        REFERENCES documents.t_directories(id),

    CONSTRAINT fk_directory_access_attempts_user
        FOREIGN KEY (user_id)
        REFERENCES registry.t_users(id)
);