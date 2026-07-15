CREATE TABLE IF NOT EXISTS registry.t_companies_clients(
    id              UUID            NOT NULL    DEFAULT gen_random_uuid() ,
    display_name    VARCHAR(200)    NOT NULL,
    details         VARCHAR(3000)   NOT NULL,
    is_active       BOOLEAN         NOT NULL,
    cnpj            VARCHAR(14)         NULL,
    email           VARCHAR(320)    NOT NULL,
    created_at      TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,

    --PRIMARY KEY
    CONSTRAINT pk_companies_clients PRIMARY KEY(id),

    --UNIQUE
    CONSTRAINT uq_companies_clients_cnpj UNIQUE(cnpj),
    CONSTRAINT uq_companies_clients_email UNIQUE(email),

    --CHECK
    CONSTRAINT chk_companies_clients_display_name
        CHECK(functions.fn_is_valid_name(display_name)),
    
    CONSTRAINT chk_companies_clients_details
        CHECK(functions.fn_is_valid_text(details)),

    CONSTRAINT chk_companies_clients_status
        CHECK(is_enabled IN('A','T')),

    CONSTRAINT chk_companies_clients_cnpj
        CHECK(functions.fn_is_valid_cnpj(cnpj)),

    CONSTRAINT chk_companies_clients_email
        CHECK(functions.fn_is_valid_email(email))
    
);
