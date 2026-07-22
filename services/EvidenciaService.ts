import EvidenciaModel from "../models/EvidenciaModel";
import OcorrenciaModel from "../models/OcorrenciaModel";
import { UsuarioToken } from "@/lib/auth";

export default class EvidenciaService {
  static async criarEvidencia(dados: any) {
    // Validações
    if (!dados.id_ocorrencia) {
      throw new Error("Ocorrência é obrigatória.");
    }
    if (!dados.tipo || !["imagem", "video", "audio"].includes(dados.tipo)) {
      throw new Error("Tipo de evidência inválido.");
    }
    if (!dados.arquivo) {
      throw new Error("Arquivo da evidência é obrigatório.");
    }

    // Verifica se a ocorrência existe
    const ocorrencia = await OcorrenciaModel.buscarPorId(dados.id_ocorrencia);
    if (!ocorrencia) {
      throw new Error("Ocorrência não encontrada.");
    }

    return await EvidenciaModel.criar(dados);
  }

  static async listarPorOcorrencia(id_ocorrencia: number) {
    const ocorrencia = await OcorrenciaModel.buscarPorId(id_ocorrencia);
    if (!ocorrencia) {
      throw new Error("Ocorrência não encontrada.");
    }
    return await EvidenciaModel.listarPorOcorrencia(id_ocorrencia);
  }

  static async buscarEvidencia(id: number) {
    const evidencia = await EvidenciaModel.buscarPorId(id);
    if (!evidencia) {
      throw new Error("Evidência não encontrada.");
    }
    return evidencia;
  }

  static async eliminarEvidencia(id: number, usuario: UsuarioToken) {
    // Verifica se a evidência existe
    const evidencia = await this.buscarEvidencia(id);

    // Verifica se a ocorrência associada existe e se o usuário tem permissão
    const ocorrencia = await OcorrenciaModel.buscarPorId(evidencia.id_ocorrencia);
    if (!ocorrencia) {
      throw new Error("Ocorrência associada não encontrada.");
    }

    // Permissão: admin ou dono da ocorrência (cidadão que criou)
    if (usuario.tipo_funcao === "cidadao" && ocorrencia.id_usuario !== usuario.id_usuario) {
      throw new Error("Você não tem permissão para eliminar esta evidência.");
    }

    // Admins podem eliminar
    return await EvidenciaModel.eliminar(id);
  }
}