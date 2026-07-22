import { NextRequest } from "next/server";
import HistoricoService from "../services/HistoricoService";
import { autenticar } from "@/middleware/auth";
import ApiResponse from "../utils/response";

export default class HistoricoController {
  static async criar(req: NextRequest) {
    try {
      const usuario = autenticar(req);
      const dados = await req.json();
      dados.id_usuario = usuario.id_usuario;
      const historico = await HistoricoService.registrar(dados);
      return ApiResponse.criado({ historico }, "Histórico registrado com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async listarTodos(req: NextRequest) {
    try {
      autenticar(req); // Apenas verifica autenticação
      const historico = await HistoricoService.listarTodos();
      return ApiResponse.sucesso(historico);
    } catch (erro: any) {
      return ApiResponse.naoAutorizado(erro.message);
    }
  }

  static async listarPorOcorrencia(id_ocorrencia: number) {
    try {
      const historico = await HistoricoService.listarPorOcorrencia(id_ocorrencia);
      return ApiResponse.sucesso(historico);
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }

  static async listarPorUsuario(id_usuario: number) {
    try {
      const historico = await HistoricoService.listarPorUsuario(id_usuario);
      return ApiResponse.sucesso(historico);
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }

  static async buscarPorId(id_historico: number) {
    try {
      const historico = await HistoricoService.buscarPorId(id_historico);
      return ApiResponse.sucesso(historico);
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }
}