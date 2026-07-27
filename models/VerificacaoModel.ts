import pool from "../config/database";

export default class VerificacaoModel {
  static async criar(dados: {
    id_usuario: number;
    codigo: string;
    tipo: string;
    expiracao: Date;
  }) {
    const sql = `
      INSERT INTO verificacoes (id_usuario, codigo, tipo, expiracao)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const resultado = await pool.query(sql, [
      dados.id_usuario,
      dados.codigo,
      dados.tipo,
      dados.expiracao,
    ]);
    return resultado.rows[0];
  }

  static async buscarPorUsuario(id_usuario: number) {
    const sql = `
      SELECT * FROM verificacoes
      WHERE id_usuario = $1
      ORDER BY data_criacao DESC;
    `;
    const resultado = await pool.query(sql, [id_usuario]);
    return resultado.rows;
  }

  static async buscarPorCodigo(codigo: string, id_usuario: number) {
    const sql = `
      SELECT * FROM verificacoes
      WHERE codigo = $1 AND id_usuario = $2
      ORDER BY data_criacao DESC
      LIMIT 1;
    `;
    const resultado = await pool.query(sql, [codigo, id_usuario]);
    return resultado.rows[0] || null;
  }

  static async marcarUsado(id_verificacao: number) {
    const sql = `
      UPDATE verificacoes
      SET usado = TRUE
      WHERE id_verificacao = $1
      RETURNING *;
    `;
    const resultado = await pool.query(sql, [id_verificacao]);
    return resultado.rows[0] || null;
  }
}