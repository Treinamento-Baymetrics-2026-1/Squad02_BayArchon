CREATE TABLE IF NOT EXISTS notifications.t_notifications (
    id              UUID                                    NOT NULL    DEFAULT gen_random_uuid(),
    title           VARCHAR(200)                            NOT NULL,
    message         VARCHAR(3000)                           NOT NULL,
    type            notifications.e_type_t_notifications    NOT NULL,
    is_read         BOOLEAN                                 NOT NULL    DEFAULT FALSE,
    read_at         TIMESTAMPTZ                                 NULL    DEFAULT NULL,
    created_at      TIMESTAMPTZ                             NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    deleted_at      TIMESTAMPTZ                                 NULL        DEFAULT NULL,
    is_deleted      BOOLEAN                                 NOT NULL    DEFAULT FALSE, 
    user_id         UUID                                    NOT NULL,

    -- Primary Key
    CONSTRAINT pk_notifications
        PRIMARY KEY (id),

    -- Checks
    CONSTRAINT chk_notifications_title
        CHECK (
            functions.fn_is_valid_text(title)
        ),

    CONSTRAINT chk_notifications_message
        CHECK (
            functions.fn_is_valid_text(message)
        ),

    CONSTRAINT chk_notifications_read
        CHECK (
            (is_read = FALSE AND read_at IS NULL)
            OR
            (is_read = TRUE AND read_at IS NOT NULL)
        ),

    CONSTRAINT chk_notifications_soft_delete
        CHECK (
            functions.fn_is_not_deleted(
                is_deleted,
                deleted_at
            )
        ),

    -- Foreign Key
    CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id)
        REFERENCES registry.t_users(id)
);