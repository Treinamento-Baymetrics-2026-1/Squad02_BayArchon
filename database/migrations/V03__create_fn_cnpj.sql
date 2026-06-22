CREATE OR REPLACE FUNCTION functions.cnpj(IN p_cnpj TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS
$$
DECLARE
    v_cnpj TEXT;
    v_sum INTEGER;
    v_weight INTEGER;
    v_num1 INTEGER;
    v_num2 INTEGER;
    i INTEGER;
BEGIN
    v_cnpj := regexp_replace(p_cnpj, '\D', '', 'g');

    IF length(v_cnpj) <> 14 THEN
        RETURN FALSE;
    END IF;

    -- rejeita sequência repetida
    IF v_cnpj ~ '^(.)\1{13}$' THEN
        RETURN FALSE;
    END IF;

    -- primeiro dígito
    v_sum := 0;
    v_weight := 5;

    FOR i IN 1..12 LOOP
        v_sum := v_sum +
            CAST(SUBSTRING(v_cnpj FROM i FOR 1) AS INTEGER) * v_weight;

        v_weight := v_weight - 1;
        IF v_weight < 2 THEN
            v_weight := 9;
        END IF;
    END LOOP;

    v_num1 := v_sum % 11;
    v_num1 := CASE WHEN v_num1 < 2 THEN 0 ELSE 11 - v_num1 END;

    -- segundo dígito
    v_sum := 0;
    v_weight := 6;

    FOR i IN 1..13 LOOP
        v_sum := v_sum +
            CAST(SUBSTRING(v_cnpj FROM i FOR 1) AS INTEGER) * v_weight;

        v_weight := v_weight - 1;
        IF v_weight < 2 THEN
            v_weight := 9;
        END IF;
    END LOOP;

    v_num2 := v_sum % 11;
    v_num2 := CASE WHEN v_num2 < 2 THEN 0 ELSE 11 - v_num2 END;

    RETURN
        v_num1 = CAST(SUBSTRING(v_cnpj FROM 13 FOR 1) AS INTEGER)
        AND
        v_num2 = CAST(SUBSTRING(v_cnpj FROM 14 FOR 1) AS INTEGER);
END;
$$;