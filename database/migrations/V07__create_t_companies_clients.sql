CREATE TABLE IF NOT EXISTS registry.t_companies_clients(
    id              UUID            NOT NULL    DEFAULT gen_random_uuid() ,
    display_name    VARCHAR(200)    NOT NULL,
    is_enabled          CHAR(1)     NOT NULL,
    cnpj            VARCHAR(14)     NOT NULL,
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
    
    CONSTRAINT chk_companies_clients_status
        CHECK(is_enabled IN('A','T')),

    CONSTRAINT chk_companies_clients_cnpj
        CHECK(functions.fn_is_valid_cnpj(cnpj)),

    CONSTRAINT chk_companies_clients_email
        CHECK(functions.fn_is_valid_email(email))
    
);
