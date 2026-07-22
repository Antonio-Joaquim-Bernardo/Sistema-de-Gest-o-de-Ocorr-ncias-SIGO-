import { NextRequest } from "next/server";
import EvidenciaService from "../services/EvidenciaService";
import { autenticar } from "@/middleware/auth";
import ApiResponse from "../utils/response";

export default class EvidenciaController {
  /**
   * Adiciona uma evidência a uma ocorrência
   */
  static async criar(req: NextRequest) {
    try {
      const usuario = autenticar(req);
      const dados = await req.json();
      // O service já valida a ocorrência e permissões
      const evidencia = await EvidenciaService.criarEvidencia(dados);
      return ApiResponse.criado({ evidencia }, "Evidência adicionada com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  /**
   * Lista todas as evidências de uma ocorrência
   */
  static async listarPorOcorrencia(req: NextRequest, id_ocorrencia: number) {
    try {
      autenticar(req);
      const evidencias = await EvidenciaService.listarPorOcorrencia(id_ocorrencia);
      return ApiResponse.sucesso(evidencias);
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }

  /**
   * Busca uma evidência por ID
   */
  static async buscarPorId(req: NextRequest, id: number) {
    try {
      autenticar(req);
      const evidencia = await EvidenciaService.buscarEvidencia(id);
      return ApiResponse.sucesso(evidencia);
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }

  /**
   * Elimina uma evidência (apenas admin ou dono da ocorrência)
   */
  static async eliminar(req: NextRequest, id: number) {
    try {
      const usuario = autenticar(req);
      await EvidenciaService.eliminarEvidencia(id, usuario);
      return ApiResponse.sucesso(null, "Evidência eliminada com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }
}