import { NextRequest } from "next/server";
import VerificacaoService from "../services/VerificacaoService";
import { autenticar } from "@/middleware/auth";
import ApiResponse from "../utils/response";

export default class VerificacaoController {
  /**
   * Envia código de verificação para o email do usuário autenticado
   */
  static async enviar(req: NextRequest) {
    try {
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
   * Verifica o código fornecido
   */
  static async verificar(req: NextRequest) {
    try {
      const usuario = autenticar(req);
      const { codigo } = await req.json();
      if (!codigo) {
        throw new Error("Código é obrigatório.");
      }
      const resultado = await VerificacaoService.verificarCodigo(usuario.id_usuario, codigo);
      return ApiResponse.sucesso(resultado, "Conta confirmada!");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  /**
   * Reenvia o código
   */
  static async reenviar(req: NextRequest) {
    try {
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