import { NextRequest } from "next/server";
import VerificacaoService from "../services/VerificacaoService";
import UsuarioModel from "../models/UsuarioModel";
import ApiResponse from "../utils/response";

export default class VerificacaoController {
  /**
   * Verifica o código de confirmação (público, sem autenticação)
   * Recebe email e código no corpo da requisição
   */
  static async verificar(req: NextRequest) {
    try {
      const { email, codigo } = await req.json();

      if (!email || !codigo) {
        throw new Error("Email e código são obrigatórios.");
      }

      // Busca o usuário pelo email
      const usuario = await UsuarioModel.buscarPorEmail(email);
      if (!usuario) {
        throw new Error("Usuário não encontrado.");
      }

      // Verifica o código
      const resultado = await VerificacaoService.verificarCodigo(usuario.id_usuario, codigo);
      return ApiResponse.sucesso(resultado, "Conta confirmada!");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  /**
   * Envia código de verificação (requer autenticação)
   * Útil para reenvio
   */
  static async enviar(req: NextRequest) {
    try {
      // Obtém o usuário do token (autenticado)
      const { autenticar } = await import("@/middleware/auth");
      const usuario = autenticar(req);
      const resultado = await VerificacaoService.enviarCodigoEmail(usuario.id_usuario);
      return ApiResponse.sucesso(
        { mensagem: "Código enviado para o seu email." },
        "Código enviado com sucesso."
      );
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  /**
   * Reenvia o código (requer autenticação)
   */
  static async reenviar(req: NextRequest) {
    try {
      const { autenticar } = await import("@/middleware/auth");
      const usuario = autenticar(req);
      const resultado = await VerificacaoService.reenviarCodigo(usuario.id_usuario);
      return ApiResponse.sucesso(
        { mensagem: "Novo código enviado para o seu email." },
        "Código reenviado."
      );
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }
}