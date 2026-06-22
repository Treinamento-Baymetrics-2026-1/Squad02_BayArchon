CREATE TABLE IF NOT EXISTS registry.categories(
    id INTEGER GENERATED ALWAYS AS IDENTITY(
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME id_sequence_t_categories
    ),

    name            VARCHAR(150)        NOT NULL,
    description     VARCHAR(3000)       NOT NULL,
    created_at      TIMESTAMPTZ         NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    deleted_at      TIMESTAMPTZ                   DEFAULT NULL,
    is_deleted      BOOLEAN             NOT NULL  DEFAULT FALSE,

    CONSTRAINT pk_categories PRIMARY KEY(id),

    CONSTRAINT chk_categories_name
        CHECK(functions.name(name)),

    CONSTRAINT chk_categories_description
        CHECK(functions.description(description)),

    CONSTRAINT chk_categorias_created_at
        CHECK(created_at <= CURRENT_TIMESTAMP)
);
