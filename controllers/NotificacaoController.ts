import { NextRequest } from "next/server";
import NotificacaoService from "../services/NotificacaoService";
import { autenticar } from "@/middleware/auth";
import ApiResponse from "../utils/response";

export default class NotificacaoController {
  /**
   * Lista notificações de um usuário específico (apenas o próprio ou admin)
   */
  static async listarPorUsuario(req: NextRequest, id_usuario: number) {
    try {
      const usuarioLogado = autenticar(req);
      const notificacoes = await NotificacaoService.listarPorUsuario(
        id_usuario,
        usuarioLogado
      );
      return ApiResponse.sucesso(notificacoes);
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  /**
   * Marca uma notificação como lida
   */
  static async marcarComoLida(req: NextRequest, id_notificacao: number) {
    try {
      const usuarioLogado = autenticar(req);
      const notificacao = await NotificacaoService.marcarComoLida(
        id_notificacao,
        usuarioLogado
      );
      return ApiResponse.sucesso(
        { notificacao },
        "Notificação marcada como lida."
      );
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  /**
   * Elimina uma notificação (apenas o dono ou admin)
   */
  static async eliminar(req: NextRequest, id_notificacao: number) {
    try {
      const usuarioLogado = autenticar(req);
      await NotificacaoService.eliminarNotificacao(id_notificacao, usuarioLogado);
      return ApiResponse.sucesso(null, "Notificação eliminada com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }
}