import pool from "../config/database";

export default class CategoriaModel {
  static async listar() {
    const resultado = await pool.query(`
      SELECT id_categoria, nome, descricao
      FROM categorias_ocorrencias
      ORDER BY nome;
    `);
    return resultado.rows;
  }

  static async buscarPorId(id: number) {
    const resultado = await pool.query(`
      SELECT id_categoria, nome, descricao
      FROM categorias_ocorrencias
      WHERE id_categoria = $1;
    `, [id]);
    return resultado.rows[0] || null;
  }
}