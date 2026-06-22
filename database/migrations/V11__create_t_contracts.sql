CREATE TABLE IF NOT EXISTS documents.contracts(
    id INTEGER GENERATED ALWAYS AS IDENTITY(
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME id_sequence_t_contracts
    ),

    expected_due_date   TIMESTAMPTZ     NOT NULL,
    description         VARCHAR(3000)   NOT NULL,
    created_at          TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    type_id                INTEGER         NOT NULL,
    client_id           INTEGER         NOT NULL,

    CONSTRAINT pk_contracts PRIMARY KEY(id),

    CONSTRAINT chk_contracts_description 
        CHECK(functions.description(description)),
    
    CONSTRAINT chk_contracts_created_at
        CHECK(created_at <= CURRENT_TIMESTAMP),

    CONSTRAINT chk_contracts_updated_at 
        CHECK(updated_at <= CURRENT_TIMESTAMP),

    CONSTRAINT fk_contracts_type
        FOREIGN KEY(type_id)
        REFERENCES documents.contracts_types(id),

    CONSTRAINT fk_constracts_client
        FOREIGN KEY(client_id)
        REFERENCES registry.companies_clients(id)
);
