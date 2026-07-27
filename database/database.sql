-- ==========================================
-- BANCO DE DADOS SIGO - VERSÃO FINAL
-- ==========================================

-- ==========================================
-- TABELA USUÁRIOS
-- ==========================================
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    bi VARCHAR(20) UNIQUE NOT NULL,
    data_nascimento DATE,
    morada VARCHAR(200),
    foto_perfil TEXT,
    telefone VARCHAR(20),
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    genero VARCHAR(20),
    estado VARCHAR(20) DEFAULT 'pendente' CHECK (estado IN ('pendente', 'confirmado', 'bloqueado')),
    tipo_funcao VARCHAR(30) DEFAULT 'cidadao' CHECK (tipo_funcao IN ('super_admin', 'admin_pna', 'admin_inema', 'admin_bombeiros', 'cidadao'))
);

-- ==========================================
-- TABELA ENTIDADES RESPONSÁVEIS
-- ==========================================
CREATE TABLE entidades_responsaveis (
    id_entidade SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- TABELA CATEGORIAS DE OCORRÊNCIAS
-- ==========================================
CREATE TABLE categorias_ocorrencias (
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- TABELA OCORRÊNCIAS
-- ==========================================
CREATE TABLE ocorrencias (
    id_ocorrencia SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_categoria INT NOT NULL,
    estado VARCHAR(30) DEFAULT 'aberto' CHECK (estado IN ('aberto', 'em_atendimento', 'equipa_enviada', 'resolvida', 'cancelada')),
    prioridade VARCHAR(20) DEFAULT 'media' CHECK (prioridade IN ('baixa', 'media', 'alta', 'critica')),
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    endereco TEXT,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fechamento TIMESTAMP,
    CONSTRAINT fk_usuario_ocorrencia FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_categoria_ocorrencia FOREIGN KEY (id_categoria) REFERENCES categorias_ocorrencias(id_categoria)
);

-- ==========================================
-- RELAÇÃO OCORRÊNCIA x ENTIDADES
-- ==========================================
CREATE TABLE ocorrencia_entidades (
    id_ocorrencia INT NOT NULL,
    id_entidade INT NOT NULL,
    data_atribuicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_ocorrencia, id_entidade),
    CONSTRAINT fk_ocorrencia_entidade FOREIGN KEY (id_ocorrencia) REFERENCES ocorrencias(id_ocorrencia) ON DELETE CASCADE,
    CONSTRAINT fk_entidade_ocorrencia FOREIGN KEY (id_entidade) REFERENCES entidades_responsaveis(id_entidade)
);

-- ==========================================
-- TABELA EVIDÊNCIAS
-- ==========================================
CREATE TABLE evidencias (
    id_evidencia SERIAL PRIMARY KEY,
    id_ocorrencia INT NOT NULL,
    tipo VARCHAR(20) CHECK (tipo IN ('imagem', 'video', 'audio')),
    arquivo TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_evidencia_ocorrencia FOREIGN KEY (id_ocorrencia) REFERENCES ocorrencias(id_ocorrencia) ON DELETE CASCADE
);

-- ==========================================
-- TABELA NOTIFICAÇÕES
-- ==========================================
CREATE TABLE notificacoes (
    id_notificacao SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_ocorrencia INT NOT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notificacao_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_notificacao_ocorrencia FOREIGN KEY (id_ocorrencia) REFERENCES ocorrencias(id_ocorrencia)
);

-- ==========================================
-- TABELA HISTÓRICO
-- ==========================================
CREATE TABLE historico (
    id_historico SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_ocorrencia INT NOT NULL,
    acao VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_historico_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_historico_ocorrencia FOREIGN KEY (id_ocorrencia) REFERENCES ocorrencias(id_ocorrencia)
);

-- ==========================================
-- TABELA VERIFICAÇÕES
-- ==========================================
CREATE TABLE verificacoes (
    id_verificacao SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    codigo VARCHAR(6) NOT NULL,
    tipo VARCHAR(20) DEFAULT 'email' CHECK (tipo IN ('email', 'telefone')),
    expiracao TIMESTAMP NOT NULL,
    usado BOOLEAN DEFAULT FALSE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_verificacao_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- ==========================================
-- ÍNDICES PARA MELHOR PERFORMANCE
-- ==========================================
CREATE INDEX idx_ocorrencias_estado ON ocorrencias(estado);
CREATE INDEX idx_ocorrencias_usuario ON ocorrencias(id_usuario);
CREATE INDEX idx_ocorrencias_categoria ON ocorrencias(id_categoria);
CREATE INDEX idx_historico_ocorrencia ON historico(id_ocorrencia);
CREATE INDEX idx_notificacoes_usuario ON notificacoes(id_usuario);
CREATE INDEX idx_evidencias_ocorrencia ON evidencias(id_ocorrencia);
CREATE INDEX idx_verificacoes_codigo ON verificacoes(codigo);
CREATE INDEX idx_verificacoes_usuario ON verificacoes(id_usuario);


