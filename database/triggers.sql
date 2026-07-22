-- ==========================================
-- TRIGGERS
-- ==========================================

-- Exemplo: Trigger para registar no histórico quando o estado de uma ocorrência mudar
-- CREATE OR REPLACE FUNCTION trigger_historico_estado()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     IF OLD.estado != NEW.estado THEN
--         INSERT INTO historico (id_usuario, id_ocorrencia, acao)
--         VALUES (NEW.id_usuario, NEW.id_ocorrencia, 'Estado alterado para ' || NEW.estado);
--     END IF;
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER trg_historico_estado
-- AFTER UPDATE ON ocorrencias
-- FOR EACH ROW
-- EXECUTE FUNCTION trigger_historico_estado();

-- (Podes adicionar triggers conforme necessidade)