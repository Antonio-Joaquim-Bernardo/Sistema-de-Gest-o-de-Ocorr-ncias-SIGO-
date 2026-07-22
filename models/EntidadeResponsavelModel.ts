import pool from "../config/database";

export default class EntidadeResponsavelModel {
  static async listar() {
    const sql = `SELECT id_entidade, nome, descricao FROM entidades_responsaveis ORDER BY nome ASC;`;
    const resultado = await pool.query(sql);
    return resultado.rows;
  }

  static async buscarPorId(id: number) {
    const sql = `SELECT id_entidade, nome, descricao FROM entidades_responsaveis WHERE id_entidade = $1;`;
    const resultado = await pool.query(sql, [id]);
    return resultado.rows[0] || null;
  }

  static async buscarPorNome(nome: string) {
    const sql = `SELECT id_entidade, nome, descricao FROM entidades_responsaveis WHERE nome = $1;`;
    const resultado = await pool.query(sql, [nome]);
    return resultado.rows[0] || null;
  }

  static async criar(dados: any) {
    const sql = `
      INSERT INTO entidades_responsaveis (nome, descricao)
      VALUES ($1, $2) RETURNING *;
    `;
    const resultado = await pool.query(sql, [dados.nome, dados.descricao]);
    return resultado.rows[0];
  }

  static async atualizar(id: number, dados: any) {
    const sql = `
      UPDATE entidades_responsaveis
      SET nome = $1, descricao = $2
      WHERE id_entidade = $3 RETURNING *;
    `;
    const resultado = await pool.query(sql, [dados.nome, dados.descricao, id]);
    return resultado.rows[0] || null;
  }

  static async eliminar(id: number) {
    await pool.query(`DELETE FROM entidades_responsaveis WHERE id_entidade = $1;`, [id]);
    return true;
  }
}