CREATE TABLE IF NOT EXISTS registry.t_projects(
    id INTEGER GENERATED ALWAYS AS IDENTITY(
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME projects_seq_id
    ),

    display_name        VARCHAR(300)    NOT NULL,
    current_stage       CHAR(1)         NOT NULL,
    details             VARCHAR(3000)   NOT NULL,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    client_id           UUID            NOT NULL,
    category_id         INTEGER         NOT NULL,

    --PRIMARY KEY
    CONSTRAINT pk_projects PRIMARY KEY(id),

    --CHECK
    CONSTRAINT chk_projects_display_name  
        CHECK(functions.fn_is_valid_name(display_name)),

    CONSTRAINT chk_projects_status
        CHECK(current_stage IN('c','p','f')),
    
    CONSTRAINT chk_projects_details
        CHECK(functions.fn_is_valid_text(details)),
    
    --FOREIGN KEY
    CONSTRAINT fk_projects_client
        FOREIGN KEY(client_id)
        REFERENCES registry.t_companies_clients(id),

    CONSTRAINT fk_projects_category
        FOREIGN KEY(category_id)
        REFERENCES registry.t_categories(id)
);
