CREATE OR REPLACE FUNCTION functions.fn_is_valid_cpf(
    IN p_cpf TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
PARALLEL SAFE
AS
$$
DECLARE
    v_sum        INTEGER;
    v_remainder  INTEGER;
    v_digit1     INTEGER;
    v_digit2     INTEGER;
    v_i          INTEGER;
BEGIN
    -- CPF obrigatório
    IF p_cpf IS NULL THEN
        RETURN FALSE;
    END IF;

    -- Aceita somente 11 dígitos
    IF p_cpf !~ '^[0-9]{11}$' THEN
        RETURN FALSE;
    END IF;

    -- Rejeita sequências repetidas
    IF p_cpf IN (
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ) THEN
        RETURN FALSE;
    END IF;

    -- Primeiro dígito verificador
    v_sum := 0;

    FOR v_i IN 1..9 LOOP
        v_sum :=
            v_sum +
            substring(p_cpf, v_i, 1)::INTEGER * (11 - v_i);
    END LOOP;

    v_remainder := v_sum % 11;

    IF v_remainder < 2 THEN
        v_digit1 := 0;
    ELSE
        v_digit1 := 11 - v_remainder;
    END IF;

    IF v_digit1 <> substring(p_cpf, 10, 1)::INTEGER THEN
        RETURN FALSE;
    END IF;

    --   Segundo dígito verificador
    v_sum := 0;

    FOR v_i IN 1..10 LOOP
        v_sum :=
            v_sum +
            substring(p_cpf, v_i, 1)::INTEGER * (12 - v_i);
    END LOOP;

    v_remainder := v_sum % 11;

    IF v_remainder < 2 THEN
        v_digit2 := 0;
    ELSE
        v_digit2 := 11 - v_remainder;
    END IF;

    RETURN v_digit2 = substring(p_cpf, 11, 1)::INTEGER;

END;
$$;