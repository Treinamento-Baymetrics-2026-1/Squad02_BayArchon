CREATE TABLE IF NOT EXISTS documents.t_contracts(
    id INTEGER GENERATED ALWAYS AS IDENTITY(
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME contracts_seq_id
    ),

    expected_due_date   TIMESTAMPTZ     NOT NULL,
    details             VARCHAR(3000)   NOT NULL,
    created_at          TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    type_id             INTEGER         NOT NULL,
    client_id           INTEGER         NOT NULL,

    --PRIMARY KEY
    CONSTRAINT pk_contracts PRIMARY KEY(id),

    --CHECK
    CONSTRAINT chk_contracts_details
        CHECK(functions.fn_is_valid_text(details)),
    

    --FOREIGN KEY
    CONSTRAINT fk_contracts_type
        FOREIGN KEY(type_id)
        REFERENCES documents.contracts_types(id),

    CONSTRAINT fk_constracts_client
        FOREIGN KEY(client_id)
        REFERENCES registry.companies_clients(id)
);
