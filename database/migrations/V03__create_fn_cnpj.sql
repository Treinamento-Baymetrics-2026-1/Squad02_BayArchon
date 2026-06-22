CREATE OR REPLACE FUNCTION exercicio4.fn_cnpj(IN p_cnpj TEXT)
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
    -- Remove qualquer caractere não numérico
    v_cnpj := regexp_replace(p_cnpj, '\D', '', 'g');

    -- Deve ter exatamente 14 dígitos
    IF length(v_cnpj) <> 14 THEN
        RETURN FALSE;
    END IF;

    -- Rejeita sequências repetidas
    IF v_cnpj IN (
        '00000000000000',
        '11111111111111',
        '22222222222222',
        '33333333333333',
        '44444444444444',
        '55555555555555',
        '66666666666666',
        '77777777777777',
        '88888888888888',
        '99999999999999'
    ) THEN
        RETURN FALSE;
    END IF;

    -- PRIMEIRO DÍGITO 
    v_sum := 0;
    v_weight := 5;

    FOR i IN 1..12 LOOP
        v_sum := v_sum +
            CAST(substr(v_cnpj, i, 1) AS INTEGER) * v_weight;

        v_weight := v_weight - 1;

        IF v_weight < 2 THEN
            v_weight := 9;
        END IF;
    END LOOP;

    v_num1 := v_sum % 11;

    IF v_num1 < 2 THEN
        v_num1 := 0;
    ELSE
        v_num1 := 11 - v_num1;
    END IF;

    -- SEGUNDO DÍGITO
     
    v_sum := 0;
    v_weight := 6;

    FOR i IN 1..13 LOOP
        v_sum := v_sum +
            CAST(substr(v_cnpj, i, 1) AS INTEGER) * v_weight;

        v_weight := v_weight - 1;

        IF v_weight < 2 THEN
            v_weight := 9;
        END IF;
    END LOOP;

    v_num2 := v_sum % 11;

    IF v_num2 < 2 THEN
        v_num2 := 0;
    ELSE
        v_num2 := 11 - v_num2;
    END IF;

    -- Valida os dígitos finais
    RETURN
        v_num1 = CAST(substr(v_cnpj, 13, 1) AS INTEGER)
        AND
        v_num2 = CAST(substr(v_cnpj, 14, 1) AS INTEGER);
END;
$$;
