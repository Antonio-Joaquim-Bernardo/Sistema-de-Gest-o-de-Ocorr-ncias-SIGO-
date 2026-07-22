import { NextRequest } from "next/server";
import { verificarToken, UsuarioToken, extrairToken } from "@/lib/auth";

/**
 * Middleware de autenticação.
 * Extrai o token do cookie ou cabeçalho Authorization,
 * verifica e retorna os dados do usuário.
 *
 * @param request - NextRequest
 * @returns UsuarioToken
 * @throws Error se não autenticado
 */
export function autenticar(request: NextRequest): UsuarioToken {
  // Tenta extrair token de várias fontes
  const token = extrairToken(request);

  if (!token) {
    throw new Error("Acesso negado. Faça login.");
  }

  try {
    return verificarToken(token);
  } catch (error) {
    throw new Error("Token inválido ou expirado.");
  }
}