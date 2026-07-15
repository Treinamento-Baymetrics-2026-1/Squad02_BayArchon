CREATE TABLE IF NOT EXISTS compliance.t_terms_consents (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME terms_consents_seq_id
    ),

    accepted_at         TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id             UUID            NOT NULL,
    policy_id           INTEGER         NOT NULL,

    -- Primary Key
    CONSTRAINT pk_terms_consents
        PRIMARY KEY (id),

    -- Foreign Keys
    CONSTRAINT fk_terms_consents_user
        FOREIGN KEY (user_id)
        REFERENCES registry.t_users(id),

    CONSTRAINT fk_terms_consents_policy
        FOREIGN KEY (policy_id)
        REFERENCES compliance.t_terms_of_use(id)

);