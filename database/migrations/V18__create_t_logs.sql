CREATE TABLE IF NOT EXISTS logs.t_logs(
    id  INTEGER GENERATED ALWAYS AS IDENTITY(
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME logs_seq_id
    ),

    type_logs       logs.e_event_type_t_logs     NOT NULL,
    user_id         UUID                             NULL,
    details         JSONB                            NULL,
    created_at      TIMESTAMPTZ                  NOT NULL    DEFAULT CURRENT_TIMESTAMP,

    --PRIMARY KEY
    CONSTRAINT pk_logs PRIMARY KEY(id),

    --FOREIGN KEY
    CONSTRAINT fk_logs_user
        FOREIGN KEY(user_id)
        REFERENCES registry.profiles(id)
);
