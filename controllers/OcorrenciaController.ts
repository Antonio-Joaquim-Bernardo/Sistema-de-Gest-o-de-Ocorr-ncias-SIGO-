import { NextRequest } from "next/server";
import OcorrenciaService from "../services/OcorrenciaService";
import { autenticar } from "@/middleware/auth";
import ApiResponse from "../utils/response";

export default class OcorrenciaController {
  static async criar(req: NextRequest) {
    try {
      const usuario = autenticar(req);
      const dados = await req.json();
      dados.id_usuario = usuario.id_usuario;
      const ocorrencia = await OcorrenciaService.criarOcorrencia(dados);
      return ApiResponse.criado({ ocorrencia }, "Ocorrência criada com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async listar(req: NextRequest) {
    try {
      const usuario = autenticar(req);
      const ocorrencias = await OcorrenciaService.listarOcorrencias(usuario);
      return ApiResponse.sucesso(ocorrencias);
    } catch (erro: any) {
      return ApiResponse.naoAutorizado(erro.message);
    }
  }

  static async buscarPorId(id: number, req: NextRequest) {
    try {
      const usuario = autenticar(req);
      const ocorrencia = await OcorrenciaService.buscarOcorrencia(id, usuario);
      return ApiResponse.sucesso(ocorrencia);
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }

  static async atualizarEstado(id: number, req: NextRequest) {
    try {
      const usuario = autenticar(req);
      const { estado } = await req.json();
      const ocorrencia = await OcorrenciaService.atualizarEstado(id, estado, usuario);
      return ApiResponse.sucesso({ ocorrencia }, "Estado atualizado com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async atualizarDados(id: number, req: NextRequest) {
    try {
      const usuario = autenticar(req);
      const dados = await req.json();
      const ocorrencia = await OcorrenciaService.atualizarOcorrencia(id, dados, usuario);
      return ApiResponse.sucesso({ ocorrencia }, "Dados atualizados com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async eliminar(id: number, req: NextRequest) {
    try {
      const usuario = autenticar(req);
      await OcorrenciaService.eliminarOcorrencia(id, usuario);
      return ApiResponse.sucesso(null, "Ocorrência eliminada com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }
}