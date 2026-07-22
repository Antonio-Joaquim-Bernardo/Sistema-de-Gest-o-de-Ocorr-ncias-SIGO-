import { NextRequest } from "next/server";
import { autenticar } from "./auth";
import { verificarPermissao } from "./permissions";
import { TipoFuncao } from "@/lib/auth";

/**
 * Middleware que verifica se o usuário é um administrador
 * (super_admin ou admin de alguma entidade).
 * Pode ser usado em rotas que exigem papel de administrador.
 */
export function apenasAdministradores(request: NextRequest) {
  const usuario = autenticar(request);
  verificarPermissao(usuario.tipo_funcao, [
    "super_admin",
    "admin_pna",
    "admin_inema",
    "admin_bombeiros",
  ]);
  return usuario;
}

/**
 * Middleware que verifica se o usuário é super_admin.
 */
export function apenasSuperAdmin(request: NextRequest) {
  const usuario = autenticar(request);
  verificarPermissao(usuario.tipo_funcao, ["super_admin"]);
  return usuario;
}