import EntidadeResponsavelModel from "../models/EntidadeResponsavelModel";

export default class EntidadeResponsavelService {
  static async listarEntidades() {
    return await EntidadeResponsavelModel.listar();
  }

  static async buscarEntidade(id: number) {
    const entidade = await EntidadeResponsavelModel.buscarPorId(id);
    if (!entidade) {
      throw new Error("Entidade responsável não encontrada.");
    }
    return entidade;
  }

  static async criarEntidade(dados: any) {
    if (!dados.nome) {
      throw new Error("O nome da entidade é obrigatório.");
    }
    const existente = await EntidadeResponsavelModel.buscarPorNome(dados.nome);
    if (existente) {
      throw new Error("Já existe uma entidade com este nome.");
    }
    return await EntidadeResponsavelModel.criar(dados);
  }

  static async atualizarEntidade(id: number, dados: any) {
    await this.buscarEntidade(id);
    if (!dados.nome) {
      throw new Error("O nome da entidade é obrigatório.");
    }
    return await EntidadeResponsavelModel.atualizar(id, dados);
  }

  static async eliminarEntidade(id: number) {
    await this.buscarEntidade(id);
    return await EntidadeResponsavelModel.eliminar(id);
  }
}