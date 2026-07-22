-- ==========================================
-- STORED PROCEDURES
-- ==========================================

-- Exemplo: Procedure para fechar ocorrência automaticamente
-- CREATE OR REPLACE PROCEDURE fechar_ocorrencia(id_ocorrencia INT)
-- LANGUAGE plpgsql
-- AS $$
-- BEGIN
--     UPDATE ocorrencias
--     SET estado = 'resolvida', data_fechamento = CURRENT_TIMESTAMP
--     WHERE id_ocorrencia = id_ocorrencia;
-- END;
-- $$;

-- (Podes adicionar outras procedures conforme necessidade)