/**
 * Estados possíveis de uma ocorrência
 */
export const ESTADOS_OCORRENCIA = [
  "aberto",
  "em_atendimento",
  "equipa_enviada",
  "resolvida",
  "cancelada",
] as const;

export type EstadoOcorrencia = typeof ESTADOS_OCORRENCIA[number];

/**
 * Prioridades de uma ocorrência
 */
export const PRIORIDADES_OCORRENCIA = [
  "baixa",
  "media",
  "alta",
  "critica",
] as const;

export type PrioridadeOcorrencia = typeof PRIORIDADES_OCORRENCIA[number];

/**
 * Estados possíveis de um usuário
 */
export const ESTADOS_USUARIO = [
  "pendente",
  "confirmado",
  "bloqueado",
] as const;

export type EstadoUsuario = typeof ESTADOS_USUARIO[number];

/**
 * Funções (tipos) de usuário
 */
export const FUNCOES_USUARIO = [
  "super_admin",
  "admin_inema",
  "admin_bombeiros",
  "admin_pna",
  "cidadao",
] as const;

export type FuncaoUsuario = typeof FUNCOES_USUARIO[number];

/**
 * Mapeamento de funções para IDs de entidades
 */
export const ENTIDADE_POR_FUNCAO: Record<FuncaoUsuario, number | null> = {
  super_admin: null,
  admin_inema: 1,
  admin_bombeiros: 2,
  admin_pna: 3,
  cidadao: null,
};

/**
 * Tipos de evidência
 */
export const TIPOS_EVIDENCIA = [
  "imagem",
  "video",
  "audio",
] as const;

export type TipoEvidencia = typeof TIPOS_EVIDENCIA[number];