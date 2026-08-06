-- ==========================================
-- DADOS INICIAIS
-- ==========================================

-- ==========================================
-- ENTIDADES PADRÃO
-- ==========================================
INSERT INTO entidades_responsaveis (nome, descricao)
VALUES 
    ('INEMA', 'Instituto Nacional de Emergência Médica'),
    ('Bombeiros', 'Serviço de proteção, combate a incêndios e salvamento'),
    ('PNA', 'Polícia Nacional de Angola')
ON CONFLICT (nome) DO NOTHING;

-- ==========================================
-- CATEGORIAS PADRÃO
-- ==========================================
INSERT INTO categorias_ocorrencias (nome, descricao)
VALUES 
    ('Incêndio', 'Ocorrências relacionadas a incêndios.'),
    ('Acidente', 'Acidentes de trânsito ou outros acidentes.'),
    ('Emergência médica', 'Situações que necessitam de atendimento médico.'),
    ('Assalto', 'Ocorrências relacionadas a crimes e assaltos.'),
    ('Desastre natural', 'Inundações, desabamentos e outros eventos naturais.'),
    ('Pessoa desaparecida', 'Casos de desaparecimento de pessoas.')
ON CONFLICT (nome) DO NOTHING;

-- ==========================================
-- SUPER ADMIN (senha: superadmin2026)
-- ==========================================
INSERT INTO usuarios (
    nome_completo,
    email,
    bi,
    senha,
    tipo_funcao,
    estado
)
VALUES (
    'Super Administrador',
    'superadmin@gmail.com',
    '000000000',  -- BI placeholder (obrigatório por ser UNIQUE NOT NULL)
    '$2b$10$XMsTmSmwfVOep8YgFMFJhukT..t/Pt/Ol6A1nN/1g4XqMSrqQ5TYu',  -- hash de "superadmin2026"
    'super_admin',
    'confirmado'
)
ON CONFLICT (email) DO NOTHING;

-- ==========================================
-- VERIFICA SE O SUPER ADMIN FOI CRIADO
-- ==========================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'superadmin@gmail.com') THEN
        RAISE NOTICE 'Super admin não foi criado. Verifique o banco de dados.';
    ELSE
        RAISE NOTICE 'Super admin criado com sucesso.';
    END IF;
END $$;