import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

// ============================================
// SEGREDO JWT
// ============================================
const segredo = process.env.JWT_SECRET;
if (!segredo) {
  throw new Error("JWT_SECRET não configurado no ambiente.");
}
const JWT_SECRET: string = segredo;

// ============================================
// TIPOS
// ============================================
export type TipoFuncao =
  | "super_admin"
  | "admin_inema"
  | "admin_bombeiros"
  | "admin_pna"
  | "cidadao";

export interface UsuarioToken extends JwtPayload {
  id_usuario: number;
  tipo_funcao: TipoFuncao;
}

// ============================================
// FUNÇÕES
// ============================================

/**
 * Cria um token JWT para o usuário
 * @param dados - Dados do usuário (id e função)
 * @returns Token JWT como string
 */
export function criarToken(dados: UsuarioToken): string {
  return jwt.sign(
    {
      id_usuario: dados.id_usuario,
      tipo_funcao: dados.tipo_funcao,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/**
 * Verifica e decodifica um token JWT
 * @param token - Token JWT
 * @returns Dados do usuário (UsuarioToken)
 * @throws Erro se token inválido ou expirado
 */
export function verificarToken(token: string): UsuarioToken {
  const dados = jwt.verify(token, JWT_SECRET);

  if (
    typeof dados === "string" ||
    !dados.id_usuario ||
    !dados.tipo_funcao
  ) {
    throw new Error("Token inválido.");
  }

  return dados as UsuarioToken;
}

/**
 * Extrai o token do cabeçalho Authorization (Bearer) ou cookie
 * @param request - NextRequest ou Request
 * @returns Token ou null
 */
export function extrairToken(request: any): string | null {
  // Tenta do cabeçalho Authorization
  const authHeader = request.headers?.get?.("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  // Tenta do cookie
  if (request.cookies?.get) {
    const cookie = request.cookies.get("token");
    if (cookie) return cookie.value;
  }

  return null;
}