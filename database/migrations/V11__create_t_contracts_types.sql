CREATE TABLE IF NOT EXISTS documents.t_contracts_types(
    id INTEGER GENERATED ALWAYS AS IDENTITY(
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME contracts_types_seq_id
    ),

    display_name    VARCHAR(300)    NOT NULL,
    details         VARCHAR(3000)   NOT NULL,
    created_at      TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    deleted_at      TIMESTAMPTZ         NULL    DEFAULT NULL,
    is_deleted      BOOLEAN         NOT NULL    DEFAULT FALSE,

    --PRIMARY KEY
    CONSTRAINT pk_contracts_types PRIMARY KEY(id),

    --CHEECK
    CONSTRAINT chk_contracts_types_display_name 
        CHECK(functions.fn_is_valid_name(display_name)),

    CONSTRAINT chk_constracts_types_details
        CHECK(functions.fn_is_valid_text(details)),

    CONSTRAINT chk_contracts_types_soft_delete
        CHECK(
            functions.fn_is_not_deleted(
                is_deleted,
                deleted_at
            )
        )
);
