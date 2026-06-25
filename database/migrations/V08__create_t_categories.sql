CREATE TABLE IF NOT EXISTS registry.t_categories(
    id INTEGER GENERATED ALWAYS AS IDENTITY(
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME categories_id_seq
    ),

    display_name    VARCHAR(150)        NOT NULL,
    details          VARCHAR(3000)       NOT NULL,
    created_at      TIMESTAMPTZ         NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ         NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    deleted_at      TIMESTAMPTZ                   DEFAULT NULL,
    is_deleted      BOOLEAN             NOT NULL  DEFAULT FALSE,

    --PRIMARY KEY
    CONSTRAINT pk_categories PRIMARY KEY(id),

    --CHECK
    CONSTRAINT chk_categories_name
        CHECK(functions.fn_is_valid_name(display_name)),

    CONSTRAINT chk_categories_description
        CHECK(functions.fn_is_valid_text(details)),

    CONSTRAINT chk_categories_soft_delete
        CHECK(
            functions.fn_is_not_deleted(
                is_deleted,
                deleted_at
            )
        )

);
