import { NextRequest } from "next/server";
import EntidadeResponsavelService from "../services/EntidadeResponsavelService";
import ApiResponse from "../utils/response";

export default class EntidadeResponsavelController {
  static async listar() {
    try {
      const entidades = await EntidadeResponsavelService.listarEntidades();
      return ApiResponse.sucesso(entidades);
    } catch (erro: any) {
      return ApiResponse.erroInterno(erro.message);
    }
  }

  static async buscarPorId(id: number) {
    try {
      const entidade = await EntidadeResponsavelService.buscarEntidade(id);
      return ApiResponse.sucesso(entidade);
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }

  static async criar(req: NextRequest) {
    try {
      const dados = await req.json();
      const entidade = await EntidadeResponsavelService.criarEntidade(dados);
      return ApiResponse.criado({ entidade }, "Entidade criada com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async atualizar(id: number, req: NextRequest) {
    try {
      const dados = await req.json();
      const entidade = await EntidadeResponsavelService.atualizarEntidade(id, dados);
      return ApiResponse.sucesso({ entidade }, "Entidade atualizada com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async eliminar(id: number) {
    try {
      await EntidadeResponsavelService.eliminarEntidade(id);
      return ApiResponse.sucesso(null, "Entidade eliminada com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }
}