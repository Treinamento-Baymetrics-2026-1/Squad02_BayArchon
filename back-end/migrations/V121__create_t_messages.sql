CREATE TABLE IF NOT EXISTS ia.t_messages (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1
        SEQUENCE NAME messages_seq_id
    ),

    content          VARCHAR(3000)  NOT NULL,
    is_sent_by_user  BOOLEAN        NOT NULL,
    created_at       TIMESTAMPTZ    NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMPTZ    NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    deleted_at       TIMESTAMPTZ        NULL    DEFAULT NULL,
    is_deleted       BOOLEAN        NOT NULL    DEFAULT FALSE,  
    chat_id          UUID           NOT NULL,

    -- Primary Key
    CONSTRAINT pk_messages
        PRIMARY KEY (id),

    -- Checks
    CONSTRAINT chk_messages_content
        CHECK (
            functions.fn_is_valid_text(content)
        ),

    CONSTRAINT chk_messages_soft_delete
        CHECK (
            functions.fn_is_not_deleted(
                is_deleted,
                deleted_at
            )
        ),

    -- Foreign Key
    CONSTRAINT fk_messages_chat
        FOREIGN KEY (chat_id)
        REFERENCES ia.t_chats(id)
);