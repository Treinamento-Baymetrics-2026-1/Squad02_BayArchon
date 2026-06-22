CREATE TABLE IF NOT EXISTS documents.contracts_types(
    id INTEGER GENERATED ALWAYS AS IDENTITY(
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME id_sequence_t_constracts_types
    ),

    name            VARCHAR(300)      NOT NULL,
    description     VARCHAR(3000)   NOT NULL,
    created_at      TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    deleted_at      TIMESTAMPTZ                 DEFAULT NULL,
    is_deleted      BOOLEAN         NOT NULL    DEFAULT FALSE,

    CONSTRAINT pk_contracts_types PRIMARY KEY(id),

    CONSTRAINT chk_contracts_types_name
        CHECK(functions.name(name)),

    CONSTRAINT chk_constracts_types_description
        CHECK(functions.description(description)),

    CONSTRAINT chk_contracts_types_created_at
        CHECK(created_at <= CURRENT_TIMESTAMP),

    CONSTRAINT chk_contracts_types_updated_at
        CHECK(updated_at <= CURRENT_TIMESTAMP)
);
