CREATE TABLE IF NOT EXISTS documents.documents (
    id              UUID                                NOT NULL DEFAULT gen_random_uuid(),
    title           VARCHAR(300)                        NOT NULL,
    visibility      documents.e_visibility_documents    NOT NULL,
    extension       VARCHAR(10)                         NOT NULL,
    source          CHAR(1)                             NOT NULL,
    created_at      TIMESTAMPTZ                         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ                         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at      TIMESTAMPTZ                                  DEFAULT NULL,
    is_deleted      BOOLEAN                             NOT NULL DEFAULT FALSE,
    updated_by      UUID                                NOT NULL,
    created_by      UUID                                NOT NULL,
    category_id     INTEGER                             NOT NULL,
    responsible_id  UUID                                    NULL,
    sector_id       INTEGER                                 NULL,
    client_id       UUID                                    NULL,
    project_id      INTEGER                                 NULL,
    object_id       UUID                                NOT NULL,

    --PRIMARY KEY
    CONSTRAINT pk_documents PRIMARY KEY(id),

    --CHECK
    CONSTRAINT chk_documents_display_name
        CHECK (functions.fn_is_valid_text(title)),

    CONSTRAINT chk_documents_source
        CHECK (source IN ('i','e')),

    CONSTRAINT chk_documents_extension
        CHECK (extension IN ('pdf','xml','txt','docx')),

    CONSTRAINT chk_documents_source
        CHECK 
        (
            (
                source = 'i'
                AND responsible_id IS NOT NULL
                AND sector_id IS NOT NULL
                AND client_id IS NULL
                AND project_id IS NULL
            )
            OR
            (
                source = 'e'
                AND responsible_id IS NULL
                AND sector_id IS NULL
                AND client_id IS NOT NULL
                AND project_id IS NOT NULL
            )
        ),

    CONSTRAINT chk_categories_soft_delete
        CHECK(
            functions.fn_is_not_deleted(
                is_deleted,
                deleted_at
            )
        ),

    --FOREIGN KEY
    CONSTRAINT fk_documents_updated_by
        FOREIGN KEY(updated_by)
        REFERENCES registry.profiles(id),

    CONSTRAINT fk_documents_created_by
        FOREIGN KEY(created_by)
        REFERENCES registry.profiles(id),

    CONSTRAINT fk_documents_category
        FOREIGN KEY(category_id)
        REFERENCES registry.categories(id),

    CONSTRAINT fk_documents_responsible
        FOREIGN KEY(responsible_id)
        REFERENCES registry.profiles(id),

    CONSTRAINT fk_documents_sector
        FOREIGN KEY(sector_id)
        REFERENCES registry.sectors(id),

    CONSTRAINT fk_documents_client
        FOREIGN KEY(client_id)
        REFERENCES registry.companies_clients(id),

    CONSTRAINT fk_documents_project
        FOREIGN KEY(project_id)
        REFERENCES registry.projects(id),

    CONSTRAINT fk_documents_object
        FOREIGN KEY(object_id)
        REFERENCES storage.objects(id)

    
);
