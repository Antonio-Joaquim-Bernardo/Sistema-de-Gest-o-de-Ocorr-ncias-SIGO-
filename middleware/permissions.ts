import { TipoFuncao } from "@/lib/auth";

/**
 * Verifica se o tipo de função do usuário está na lista de permissões.
 * @param tipo_funcao - Tipo de função do usuário
 * @param permissoesPermitidas - Lista de funções permitidas
 * @throws Error se não tiver permissão
 */
export function verificarPermissao(
  tipo_funcao: TipoFuncao,
  permissoesPermitidas: TipoFuncao[]
): void {
  if (!permissoesPermitidas.includes(tipo_funcao)) {
    throw new Error("Você não tem permissão para realizar esta ação.");
  }
}

/**
 * Retorna o ID da entidade associada a um administrador.
 * @param tipo_funcao - Tipo de função do usuário
 * @returns ID da entidade (1-INEMA, 2-Bombeiros, 3-PNA) ou null
 */
export function obterEntidadeAdministrador(
  tipo_funcao: TipoFuncao
): number | null {
  switch (tipo_funcao) {
    case "admin_inema":
      return 1;
    case "admin_bombeiros":
      return 2;
    case "admin_pna":
      return 3;
    default:
      return null;
  }
}

/**
 * Verifica se um usuário administrador pode acessar uma entidade específica.
 * @param tipo_funcao - Tipo de função do usuário
 * @param id_entidade - ID da entidade a acessar
 * @throws Error se não tiver permissão
 */
export function podeAcessarEntidade(
  tipo_funcao: TipoFuncao,
  id_entidade: number
): void {
  if (tipo_funcao === "super_admin") {
    return; // Super admin acede a tudo
  }

  const entidadeAdministrador = obterEntidadeAdministrador(tipo_funcao);
  if (entidadeAdministrador === null) {
    throw new Error("Usuário sem entidade responsável definida.");
  }

  if (entidadeAdministrador !== id_entidade) {
    throw new Error("Você não tem permissão para acessar esta entidade.");
  }
}