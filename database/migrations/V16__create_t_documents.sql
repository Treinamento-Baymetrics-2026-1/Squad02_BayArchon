CREATE TABLE IF NOT EXISTS documents.documents(
    id                  UUID                        NOT NULL    DEFAULT gen_random_uuid(),
    name                VARCHAR(300)                NOT NULL,
    status              documents.status_documents  NOT NULL,
    path                UUID                        NOT NULL,
    extension           VARCHAR(4)                  NOT NULL,
    source              CHAR(1)                     NOT NULL,    
    created_at          TIMESTAMPTZ                 NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ                 NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    deleted_at          TIMESTAMPTZ                             DEFAULT NULL,
    is_deleted          BOOLEAN                     NOT NULL    DEFAULT FALSE,
    updated_by          INTEGER                     NOT NULL,
    created_by          INTEGER                     NOT NULL,
    category_id         INTEGER                     NOT NULL,   
    responsible_id      INTEGER                         NULL,   --Referente ao documento interno
    sector_id           INTEGER                         NULL,   --Referente ao documento interno
    client_id           INTEGER                         NULL,   --Referente ao documento externo
    project_id          INTEGER                         NULL,   --Referente ao documento externo
    object_id           UUID                        NOT NULL,   

    CONSTRAINT pk_documents PRIMARY KEY(id),

    CONSTRAINT chk_documents_name
        CHECK(functions.name(name)),
        
    CONSTRAINT chk_documents_source
        CHECK(source IN('i','e')),

    CONSTRAINT chk_documents_extension
        CHECK(extesnion IN('pdf','xml','txt','docx')),

    CONSTRAINT fk_documents_path
        FOREIGN KEY(path)
        REFERENCES storage.buckets(id),

    CONSTRAINT fk_documents_updated_by
        FOREIGN KEY(updated_by)
        REFERENCES registry.profiles(id),

    CONSTRAINT fk_documents_created_by
        FOREIGN KEY(created_by)
        REFERENCES registry.profiles(id),
    
    CONSTRAINT fk_documents_category_id
        FOREIGN KEY(category_id)
        REFERENCES registry.categories(id)

    CONSTRAINT fk_documents_responsible_id
        FOREIGN KEY(responsible_id)
        REFERENCES registry.profiles(id),

    CONSTRAINT fk_documents_sector_id
        FOREIGN KEY(sector_id)
        REFERENCES registry.sectors(id),   

    CONSTRAINT fk_documents_client_id
        FOREIGN KEY(client_id)
        REFERENCES registry.companies_clients(id),

    CONSTRAINT fk_documents_project_id
        FOREIGN KEY(project_id)
        REFERENCES registry.projects(id)

    CONSTRAINT fk_documents_objects_id
        FOREIGN KEY(objects_id)
        REFERENCES storage.objects(id)
);
