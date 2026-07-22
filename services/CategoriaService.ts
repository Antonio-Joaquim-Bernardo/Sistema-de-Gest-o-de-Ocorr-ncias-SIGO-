import CategoriaModel from "../models/CategoriaModel";

export default class CategoriaService {
  static async listarCategorias() {
    return await CategoriaModel.listar();
  }

  static async buscarCategoria(id: number) {
    const categoria = await CategoriaModel.buscarPorId(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada.");
    }
    return categoria;
  }
}