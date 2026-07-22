import UsuarioService from "./UsuarioService";
import { verificarToken } from "@/lib/auth";

export default class AuthService {
  static async login(email: string, senha: string) {
    return await UsuarioService.login(email, senha);
  }

  static async registrar(dados: any) {
    return await UsuarioService.criarUsuario(dados);
  }

  static async validarToken(token: string) {
    try {
      const decodificado = verificarToken(token);
      return decodificado;
    } catch (error) {
      throw new Error("Token inválido ou expirado.");
    }
  }

  // Método para logout (apenas auxiliar, pois token é stateless)
  static logout() {
    // Não há ação no backend, apenas orientação para remover cookie
    return { mensagem: "Logout realizado com sucesso." };
  }
}