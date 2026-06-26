CREATE TABLE IF NOT EXISTS logs.logs(
    id  INTEGER GENERATED ALWAYS AS IDENTITY(
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME id_sequence_t_logs
    ),

    type_logs       logs.type_logs      NOT NULL,
    user_id         UUID                    NULL,
    details         JSONB                   NULL,
    created_at      TIMESTAMPTZ         NOT NULL    DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_logs PRIMARY KEY(id),

    CONSTRAINT fk_logs_user
        FOREIGN KEY(user_id)
        REFERENCES registry.profiles(id)
);
