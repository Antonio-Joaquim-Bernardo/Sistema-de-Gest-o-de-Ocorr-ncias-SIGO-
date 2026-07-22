import pool from "../config/database";

export default class EvidenciaModel {
  static async criar(dados: any) {
    const sql = `
      INSERT INTO evidencias (id_ocorrencia, tipo, arquivo)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const resultado = await pool.query(sql, [
      dados.id_ocorrencia,
      dados.tipo,
      dados.arquivo,
    ]);
    return resultado.rows[0];
  }

  static async listarPorOcorrencia(id_ocorrencia: number) {
    const sql = `
      SELECT id_evidencia, tipo, arquivo, data_envio
      FROM evidencias
      WHERE id_ocorrencia = $1
      ORDER BY data_envio DESC;
    `;
    const resultado = await pool.query(sql, [id_ocorrencia]);
    return resultado.rows;
  }

  static async buscarPorId(id: number) {
    const sql = `
      SELECT id_evidencia, id_ocorrencia, tipo, arquivo, data_envio
      FROM evidencias
      WHERE id_evidencia = $1;
    `;
    const resultado = await pool.query(sql, [id]);
    return resultado.rows[0] || null;
  }

  static async eliminar(id: number) {
    await pool.query(`DELETE FROM evidencias WHERE id_evidencia = $1;`, [id]);
    return true;
  }
}