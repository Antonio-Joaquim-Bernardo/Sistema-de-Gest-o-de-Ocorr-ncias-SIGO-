import { NextRequest, NextResponse } from "next/server";
import CategoriaService from "../services/CategoriaService";
import ApiResponse from "../utils/response";

export default class CategoriaController {
  /**
   * Lista todas as categorias de ocorrências
   */
  static async listar() {
    try {
      const categorias = await CategoriaService.listarCategorias();
      return ApiResponse.sucesso(categorias);
    } catch (erro: any) {
      return ApiResponse.erroInterno(erro.message);
    }
  }

  /**
   * Busca uma categoria por ID
   */
  static async buscarPorId(id: number) {
    try {
      const categoria = await CategoriaService.buscarCategoria(id);
      return ApiResponse.sucesso(categoria);
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }
}