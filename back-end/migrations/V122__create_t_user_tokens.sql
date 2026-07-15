CREATE TABLE IF NOT EXISTS ia.t_users_tokens (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME users_tokens_seq_id
    ),

    tokens_daily_limit      INTEGER         NOT NULL,
    used_tokens             INTEGER         NOT NULL    DEFAULT 0,
    created_at              TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    created_by              UUID            NOT NULL,
    updated_by              UUID                NULL,
    user_id                 UUID            NOT NULL,

    -- Primary Key
    CONSTRAINT pk_users_tokens
        PRIMARY KEY (id),

    -- Checks
    CONSTRAINT chk_users_tokens_daily_limit
        CHECK (tokens_daily_limit >= 0),

    CONSTRAINT chk_users_tokens_used_tokens
        CHECK (
            used_tokens >= 0
            AND used_tokens <= tokens_daily_limit
        ),

    -- Foreign Keys
    CONSTRAINT fk_users_tokens_created_by
        FOREIGN KEY (created_by)
        REFERENCES registry.t_users(id),

    CONSTRAINT fk_users_tokens_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES registry.t_users(id),

    CONSTRAINT fk_users_tokens_user
        FOREIGN KEY (user_id)
        REFERENCES registry.t_users(id)
);