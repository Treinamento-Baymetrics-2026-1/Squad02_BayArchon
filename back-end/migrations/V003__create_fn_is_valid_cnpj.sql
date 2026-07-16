CREATE OR REPLACE FUNCTION functions.fn_is_valid_cnpj(IN p_cnpj TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
AS
$$
DECLARE
    v_cnpj            CHAR(14);
    v_values          INTEGER[];
    v_sum             INTEGER;
    v_weight          INTEGER;
    v_digit1          INTEGER;
    v_digit2          INTEGER;
    v_position        INTEGER;
    v_char            CHAR(1);
BEGIN
    IF p_cnpj IS NULL THEN
        RETURN FALSE;
    END IF;

    v_cnpj := upper(p_cnpj);

    IF length(v_cnpj) <> 14 THEN
        RETURN FALSE;
    END IF;

    -- Primeiros 12 caracteres alfanuméricos e últimos 2 numéricos
    IF v_cnpj !~ '^[A-Z0-9]{12}[0-9]{2}$' THEN
        RETURN FALSE;
    END IF;

    -- Rejeita sequência repetida (AAAAAAAAAAAA11, 11111111111111, etc.)
    IF substring(v_cnpj, 1, 12) ~ '^([A-Z0-9])\1{11}$' THEN
        RETURN FALSE;
    END IF;

    v_values := ARRAY[]::INTEGER[];

    FOR v_position IN 1..14 LOOP
        v_char := substring(v_cnpj FROM v_position FOR 1);

        IF v_char BETWEEN '0' AND '9' THEN
            v_values := array_append(v_values, ascii(v_char) - ascii('0'));
        ELSE
            -- Conforme especificação da Receita: ASCII - 48
            v_values := array_append(v_values, ascii(v_char) - 48);
        END IF;
    END LOOP;

    -- Primeiro DV

    v_sum := 0;
    v_weight := 5;

    FOR v_position IN 1..12 LOOP
        v_sum := v_sum + (v_values[v_position] * v_weight);

        v_weight := v_weight - 1;

        IF v_weight < 2 THEN
            v_weight := 9;
        END IF;
    END LOOP;

    v_digit1 := v_sum % 11;

    IF v_digit1 < 2 THEN
        v_digit1 := 0;
    ELSE
        v_digit1 := 11 - v_digit1;
    END IF;

    -- Segundo DV

    v_sum := 0;
    v_weight := 6;

    FOR v_position IN 1..12 LOOP
        v_sum := v_sum + (v_values[v_position] * v_weight);

        v_weight := v_weight - 1;

        IF v_weight < 2 THEN
            v_weight := 9;
        END IF;
    END LOOP;

    v_sum := v_sum + (v_digit1 * 2);

    v_digit2 := v_sum % 11;

    IF v_digit2 < 2 THEN
        v_digit2 := 0;
    ELSE
        v_digit2 := 11 - v_digit2;
    END IF;

    RETURN v_digit1 = v_values[13]
       AND v_digit2 = v_values[14];
END;
$$;