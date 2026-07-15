CREATE TABLE IF NOT EXISTS ia.t_chats (
    id                  UUID            NOT NULL    DEFAULT gen_random_uuid(),
    display_title       VARCHAR(200)    NOT NULL,
    created_at          TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    is_deleted          BOOLEAN         NOT NULL    DEFAULT FALSE,
    deleted_at          TIMESTAMPTZ         NULL    DEFAULT NULL,
    user_id             UUID            NOT NULL,

    -- Primary Key
    CONSTRAINT pk_chats
        PRIMARY KEY (id),

    -- Checks
    CONSTRAINT chk_chats_display_title
        CHECK (
            functions.fn_is_valid_text(display_title)
        ),

    CONSTRAINT chk_chats_soft_delete
        CHECK (
            functions.fn_is_not_deleted(
                is_deleted,
                deleted_at
            )
        ),

    -- Foreign Key
    CONSTRAINT fk_chats_user
        FOREIGN KEY (user_id)
        REFERENCES registry.t_users(id)
);
