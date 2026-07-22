-- ==========================================
-- DADOS INICIAIS
-- ==========================================

-- Entidades padrão
INSERT INTO entidades_responsaveis (nome, descricao)
VALUES 
    ('INEMA', 'Instituto Nacional de Emergência Médica'),
    ('Bombeiros', 'Serviço de proteção, combate a incêndios e salvamento'),
    ('PNA', 'Polícia Nacional de Angola');

-- Categorias padrão
INSERT INTO categorias_ocorrencias (nome, descricao)
VALUES 
    ('Incêndio', 'Ocorrências relacionadas a incêndios.'),
    ('Acidente', 'Acidentes de trânsito ou outros acidentes.'),
    ('Emergência médica', 'Situações que necessitam de atendimento médico.'),
    ('Assalto', 'Ocorrências relacionadas a crimes e assaltos.'),
    ('Desastre natural', 'Inundações, desabamentos e outros eventos naturais.'),
    ('Pessoa desaparecida', 'Casos de desaparecimento de pessoas.');

-- ==========================================
-- SUPER ADMIN (senha: admin123)
-- ==========================================
INSERT INTO usuarios (
    nome_completo,
    email,
    senha,
    tipo_funcao,
    estado
)
VALUES (
    'Super Administrador',
    'superadmin@gmail.com',
    '$2b$10$XMsTmSmwfVOep8YgFMFJhukT..t/Pt/Ol6A1nN/1g4XqMSrqQ5TYu',
    'super_admin',
    'confirmado'
) ON CONFLICT (email) DO NOTHING;