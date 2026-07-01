CREATE TABLE IF NOT EXISTS registry.projects(
    id INTEGER GENERATED ALWAYS AS IDENTITY(
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME id_sequence_t_projects
    ),

    name            VARCHAR(300)    NOT NULL,
    status          CHAR(1)         NOT NULL,
    description     VARCHAR(3000)   NOT NULL,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    client_id       INTEGER         NOT NULL,
    category_id     INTEGER         NOT NULL,

    CONSTRAINT pk_projects PRIMARY KEY(id),

    CONSTRAINT chk_projects_name  
        CHECK(functions.name(name)),

    CONSTRAINT chk_projects_status
        CHECK(status IN('c','p','f')),
    
    CONSTRAINT chk_projects_description
        CHECK(functions.description(description)),
    
    CONSTRAINT chk_projects_created_at
        CHECK(created_at <= CURRENT_TIMESTAMP),

    CONSTRAINT chk_projects_updated_at
        CHECK(updated_at <= CURRENT_TIMESTAMP),

    CONSTRAINT fk_projects_client
        FOREIGN KEY(client_id)
        REFERENCES registry.client(id),

    CONSTRAINT fk_projects_category
        FOREIGN KEY(category_id)
        REFERENCES registry.categories(id)
);
