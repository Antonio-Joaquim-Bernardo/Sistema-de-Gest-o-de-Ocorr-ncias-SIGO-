import pool from "../config/database";

export default class NotificacaoModel {
  static async criar(dados: any) {
    const sql = `
      INSERT INTO notificacoes (id_usuario, id_ocorrencia, mensagem)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const resultado = await pool.query(sql, [
      dados.id_usuario,
      dados.id_ocorrencia,
      dados.mensagem,
    ]);
    return resultado.rows[0];
  }

  static async listarPorUsuario(id_usuario: number) {
    const sql = `
      SELECT id_notificacao, id_ocorrencia, mensagem, lida, data_envio
      FROM notificacoes
      WHERE id_usuario = $1
      ORDER BY data_envio DESC;
    `;
    const resultado = await pool.query(sql, [id_usuario]);
    return resultado.rows;
  }

  static async marcarComoLida(id_notificacao: number) {
    const sql = `
      UPDATE notificacoes
      SET lida = TRUE
      WHERE id_notificacao = $1
      RETURNING *;
    `;
    const resultado = await pool.query(sql, [id_notificacao]);
    return resultado.rows[0] || null;
  }

  static async eliminarPorOcorrencia(id_ocorrencia: number) {
    await pool.query(`DELETE FROM notificacoes WHERE id_ocorrencia = $1;`, [id_ocorrencia]);
    return true;
  }

// Adicionar no NotificacaoModel:

static async buscarPorId(id: number) {
  const sql = `SELECT * FROM notificacoes WHERE id_notificacao = $1;`;
  const resultado = await pool.query(sql, [id]);
  return resultado.rows[0] || null;
}

static async eliminar(id: number) {
  await pool.query(`DELETE FROM notificacoes WHERE id_notificacao = $1;`, [id]);
  return true;
}

}