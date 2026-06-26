CREATE TABLE IF NOT EXISTS registry.companies_clients(
    id INTEGER GENERATED ALWAYS AS IDENTITY(
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME id_sequence_t_companies_clients
    ),

    name            VARCHAR(200)    NOT NULL,
    status          CHAR(1)         NOT NULL,
    cnpj            VARCHAR(14)     NOT NULL,
    email           VARCHAR(320)    NOT NULL,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_companies_clients PRIMARY KEY(id),

    CONSTRAINT uq_companies_clients_cnpj UNIQUE(cnpj),
    CONSTRAINT uq_companies_clients_email UNIQUE(email),

    CONSTRAINT chk_companies_clients_name
        CHECK(functions.name(name)),
    
    CONSTRAINT chk_companies_clients_status
        CHECK(status IN('A','T')),

    CONSTRAINT chk_companies_clients_cnpj
        CHECK(functions.cnpj(cnpj)),

    CONSTRAINT chk_companies_clients_email
        CHECK(functions.email(email)),
    
    CONSTRAINT chk_companies_clients_created_at
        CHECK(created_at <= CURRENT_TIMESTAMP)
);
