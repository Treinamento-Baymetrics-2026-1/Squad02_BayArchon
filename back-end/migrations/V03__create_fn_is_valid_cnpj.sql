CREATE OR REPLACE FUNCTION functions.fn_is_valid_cnpj(IN p_cnpj TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
AS
$$
DECLARE
    v_digits          CHAR(14);
    v_digits_array    SMALLINT[];
    v_total           SMALLINT;
    v_weight          SMALLINT;
    v_digit1          SMALLINT;
    v_digit2          SMALLINT;
    v_digit_position  SMALLINT;
BEGIN
    v_digits := p_cnpj;

    IF length(v_digits) <> 14 THEN
        RETURN FALSE;
    END IF;

    IF v_digits !~ '^[0-9]{14}$' THEN
        RETURN FALSE;
    END IF;

    -- Rejeita sequência repetida
    IF v_digits ~ '^(.)\1{13}$' THEN
        RETURN FALSE;
    END IF;

    -- Converte os dígitos uma única vez
    v_digits_array := ARRAY(
        SELECT SUBSTRING(v_digits FROM v_digit_position FOR 1)::INTEGER
        FROM generate_series(1, 14) AS v_digit_position
    );

    -- Primeiro dígito verificador
    v_total := 0;
    v_weight := 5;

    FOR v_digit_position IN 1..12 LOOP
        v_total := v_total + (v_digits_array[v_digit_position] * v_weight);

        v_weight := v_weight - 1;

        IF v_weight < 2 THEN
            v_weight := 9;
        END IF;
    END LOOP;

    v_digit1 := v_total % 11;
    v_digit1 := CASE
                    WHEN v_digit1 < 2 THEN 0
                    ELSE 11 - v_digit1
                END;

    -- Segundo dígito verificador
    v_total := 0;
    v_weight := 6;

    FOR v_digit_position IN 1..13 LOOP
        v_total := v_total + (v_digits_array[v_digit_position] * v_weight);

        v_weight := v_weight - 1;

        IF v_weight < 2 THEN
            v_weight := 9;
        END IF;
    END LOOP;

    v_digit2 := v_total % 11;
    v_digit2 := CASE
                    WHEN v_digit2 < 2 THEN 0
                    ELSE 11 - v_digit2
                END;

    RETURN v_digit1 = v_digits_array[13]
       AND v_digit2 = v_digits_array[14];
END;
$$;