import OcorrenciaEntidadeModel from "../models/OcorrenciaEntidadeModel";
import OcorrenciaModel from "../models/OcorrenciaModel";
import EntidadeResponsavelModel from "../models/EntidadeResponsavelModel";
import HistoricoService from "./HistoricoService";
import { obterEntidadeAdministrador } from "@/middleware/permissions";
import { UsuarioToken } from "@/lib/auth";

export default class OcorrenciaEntidadeService {
  static async adicionarEntidades(
    id_ocorrencia: number,
    entidades: number[],
    id_usuario: number
  ) {
    const ocorrencia = await OcorrenciaModel.buscarPorId(id_ocorrencia);
    if (!ocorrencia) {
      throw new Error("Ocorrência não encontrada.");
    }
    if (!entidades || entidades.length === 0) {
      throw new Error("Nenhuma entidade selecionada.");
    }

    for (const id_entidade of entidades) {
      const entidade = await EntidadeResponsavelModel.buscarPorId(id_entidade);
      if (!entidade) {
        throw new Error(`Entidade ${id_entidade} não encontrada.`);
      }
    }

    const resultado = await OcorrenciaEntidadeModel.adicionarEntidades(
      id_ocorrencia,
      entidades
    );

    for (const id_entidade of entidades) {
      const entidade = await EntidadeResponsavelModel.buscarPorId(id_entidade);
      await HistoricoService.registrar({
        id_usuario,
        id_ocorrencia,
        acao: `Entidade ${entidade.nome} atribuída à ocorrência.`,
      });
    }

    return resultado;
  }

  static async listarEntidades(id_ocorrencia: number) {
    const ocorrencia = await OcorrenciaModel.buscarPorId(id_ocorrencia);
    if (!ocorrencia) {
      throw new Error("Ocorrência não encontrada.");
    }
    return await OcorrenciaEntidadeModel.listarPorOcorrencia(id_ocorrencia);
  }

  static async removerEntidade(
    id_ocorrencia: number,
    id_entidade: number,
    usuario: UsuarioToken
  ) {
    const ocorrencia = await OcorrenciaModel.buscarPorId(id_ocorrencia);
    if (!ocorrencia) {
      throw new Error("Ocorrência não encontrada.");
    }

    // Verifica permissão
    if (usuario.tipo_funcao !== "super_admin") {
      const entidadeUsuario = obterEntidadeAdministrador(usuario.tipo_funcao);
      if (entidadeUsuario !== id_entidade) {
        throw new Error("Você não pode remover esta entidade.");
      }
    }

    const entidade = await EntidadeResponsavelModel.buscarPorId(id_entidade);
    const removida = await OcorrenciaEntidadeModel.removerEntidade(
      id_ocorrencia,
      id_entidade
    );

    if (!removida) {
      throw new Error("Esta entidade não está associada à ocorrência.");
    }

    await HistoricoService.registrar({
      id_usuario: usuario.id_usuario,
      id_ocorrencia,
      acao: `Entidade ${entidade.nome} removida da ocorrência.`,
    });

    return removida;
  }
}