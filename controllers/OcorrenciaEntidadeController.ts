import { NextRequest } from "next/server";
import OcorrenciaEntidadeService from "../services/OcorrenciaEntidadeService";
import { autenticar } from "@/middleware/auth";
import ApiResponse from "../utils/response";

export default class OcorrenciaEntidadeController {
  static async adicionar(req: NextRequest, id_ocorrencia: number) {
    try {
      const usuario = autenticar(req);
      const { entidades } = await req.json();
      if (!Array.isArray(entidades)) {
        throw new Error("Lista de entidades inválida.");
      }
      const resultado = await OcorrenciaEntidadeService.adicionarEntidades(
        id_ocorrencia,
        entidades,
        usuario.id_usuario
      );
      return ApiResponse.criado(
        { entidades: resultado },
        "Entidades atribuídas com sucesso."
      );
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async listar(id_ocorrencia: number) {
    try {
      const entidades = await OcorrenciaEntidadeService.listarEntidades(id_ocorrencia);
      return ApiResponse.sucesso(entidades);
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }

  static async remover(req: NextRequest, id_ocorrencia: number, id_entidade: number) {
    try {
      const usuario = autenticar(req);
      await OcorrenciaEntidadeService.removerEntidade(id_ocorrencia, id_entidade, usuario);
      return ApiResponse.sucesso(null, "Entidade removida da ocorrência.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }
}