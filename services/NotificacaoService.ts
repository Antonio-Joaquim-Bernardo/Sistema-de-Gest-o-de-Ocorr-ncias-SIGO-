import NotificacaoModel from "../models/NotificacaoModel";
import UsuarioModel from "../models/UsuarioModel";
import OcorrenciaModel from "../models/OcorrenciaModel";
import { UsuarioToken } from "@/lib/auth";

export default class NotificacaoService {
  static async criarNotificacao(dados: any) {
    if (!dados.id_usuario) {
      throw new Error("Usuário é obrigatório.");
    }
    if (!dados.id_ocorrencia) {
      throw new Error("Ocorrência é obrigatória.");
    }
    if (!dados.mensagem) {
      throw new Error("Mensagem da notificação é obrigatória.");
    }

    const usuario = await UsuarioModel.buscarPorId(dados.id_usuario);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    const ocorrencia = await OcorrenciaModel.buscarPorId(dados.id_ocorrencia);
    if (!ocorrencia) {
      throw new Error("Ocorrência não encontrada.");
    }

    return await NotificacaoModel.criar(dados);
  }

  static async listarPorUsuario(id_usuario: number, usuarioLogado: UsuarioToken) {
    // Apenas o próprio usuário ou admin pode ver
    if (usuarioLogado.tipo_funcao !== "super_admin" && usuarioLogado.id_usuario !== id_usuario) {
      throw new Error("Você não tem permissão para ver estas notificações.");
    }

    const usuario = await UsuarioModel.buscarPorId(id_usuario);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    return await NotificacaoModel.listarPorUsuario(id_usuario);
  }

  static async marcarComoLida(id_notificacao: number, usuarioLogado: UsuarioToken) {
    const notificacao = await NotificacaoModel.marcarComoLida(id_notificacao);
    if (!notificacao) {
      throw new Error("Notificação não encontrada.");
    }

    // Verifica se o usuário tem permissão para marcar esta notificação como lida
    if (usuarioLogado.tipo_funcao !== "super_admin" && usuarioLogado.id_usuario !== notificacao.id_usuario) {
      throw new Error("Você não tem permissão para marcar esta notificação como lida.");
    }

    return notificacao;
  }

  static async eliminarNotificacao(id_notificacao: number, usuarioLogado: UsuarioToken) {
    const notificacao = await NotificacaoModel.buscarPorId(id_notificacao);
    if (!notificacao) {
      throw new Error("Notificação não encontrada.");
    }

    // Permissão: apenas o dono ou admin
    if (usuarioLogado.tipo_funcao !== "super_admin" && usuarioLogado.id_usuario !== notificacao.id_usuario) {
      throw new Error("Você não tem permissão para eliminar esta notificação.");
    }
    
    await NotificacaoModel.eliminar(id_notificacao);
    return true;
  }
}