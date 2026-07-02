INSERT INTO registry.t_sectors (
    display_name,
	details,
    created_at,
    updated_at,
    is_deleted
)
VALUES (
    'Tecnologia',
	'Blah blah blah 12',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    FALSE
);

INSERT INTO auth.users(
	 id, 
     email)
	VALUES (
        '0204a398-34ba-4962-b200-babc22229d54',
        'maria.sinis@outlook.com'
    );

INSERT INTO registry.t_users (
    id,
    display_name,
    situation,
    access_level,
    created_at,
    is_deleted,
    is_active,
    sector_id
)
VALUES (
    '0204a398-34ba-4962-b200-babc22229d54',
    'Maria Teste',
    'active',
    'c',
    NOW(),
    FALSE,
    TRUE,
    3
);