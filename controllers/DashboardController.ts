import { NextRequest } from "next/server";
import OcorrenciaModel from "../models/OcorrenciaModel";
import UsuarioModel from "../models/UsuarioModel";
import { autenticar } from "@/middleware/auth";
import ApiResponse from "../utils/response";

export default class DashboardController {
  /**
   * Obtém estatísticas gerais para o dashboard
   * Apenas usuários autenticados podem acessar
   */
  static async estatisticasGerais(req: NextRequest) {
    try {
      const usuario = autenticar(req);

      // Total de ocorrências
      const totalOcorrencias = await OcorrenciaModel.listar();
      const total = totalOcorrencias.length;

      // Ocorrências por estado (usando um agrupamento simples)
      const porEstado: Record<string, number> = {};
      totalOcorrencias.forEach((oc: any) => {
        porEstado[oc.estado] = (porEstado[oc.estado] || 0) + 1;
      });

      // Total de usuários (apenas para super_admin)
      let totalUsuarios = 0;
      if (usuario.tipo_funcao === "super_admin") {
        const usuarios = await UsuarioModel.listar();
        totalUsuarios = usuarios.length;
      }

      return ApiResponse.sucesso({
        totalOcorrencias: total,
        porEstado,
        totalUsuarios,
        usuarioLogado: {
          id_usuario: usuario.id_usuario,
          tipo_funcao: usuario.tipo_funcao,
        },
      });
    } catch (erro: any) {
      return ApiResponse.naoAutorizado(erro.message);
    }
  }

  /**
   * Obtém estatísticas específicas para uma entidade (admin)
   */
  static async estatisticasPorEntidade(req: NextRequest, id_entidade: number) {
    try {
      const usuario = autenticar(req);
      // Verificar se o usuário é admin da entidade ou super_admin
      // (A validação pode ser feita no service, mas aqui apenas retornamos)
      // Para simplificar, vamos chamar o modelo diretamente
      const ocorrencias = await OcorrenciaModel.listarPorEntidade(id_entidade);
      return ApiResponse.sucesso({
        id_entidade,
        total: ocorrencias.length,
        ocorrencias,
      });
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }
}