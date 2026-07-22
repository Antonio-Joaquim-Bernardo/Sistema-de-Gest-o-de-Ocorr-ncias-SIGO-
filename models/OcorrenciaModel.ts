import pool from "../config/database";

export default class OcorrenciaModel {
  static async criar(dados: any) {
    const sql = `
      INSERT INTO ocorrencias (
        id_usuario, id_categoria, titulo, descricao, prioridade,
        endereco, latitude, longitude
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const resultado = await pool.query(sql, [
      dados.id_usuario,
      dados.id_categoria,
      dados.titulo,
      dados.descricao,
      dados.prioridade,
      dados.endereco,
      dados.latitude,
      dados.longitude,
    ]);
    return resultado.rows[0];
  }

  static async listar() {
    const resultado = await pool.query(`
      SELECT o.*, u.nome_completo, c.nome AS categoria
      FROM ocorrencias o
      INNER JOIN usuarios u ON o.id_usuario = u.id_usuario
      INNER JOIN categorias_ocorrencias c ON o.id_categoria = c.id_categoria
      ORDER BY o.id_ocorrencia DESC;
    `);
    return resultado.rows;
  }

  static async buscarPorId(id: number) {
    const resultado = await pool.query(`
      SELECT o.*, u.nome_completo, c.nome AS categoria
      FROM ocorrencias o
      INNER JOIN usuarios u ON o.id_usuario = u.id_usuario
      INNER JOIN categorias_ocorrencias c ON o.id_categoria = c.id_categoria
      WHERE o.id_ocorrencia = $1;
    `, [id]);
    return resultado.rows[0] || null;
  }

  static async atualizarEstado(id: number, estado: string) {
    const resultado = await pool.query(`
      UPDATE ocorrencias
      SET estado = $1,
          data_fechamento = CASE
            WHEN $1 IN ('resolvida', 'cancelada') THEN CURRENT_TIMESTAMP
            ELSE data_fechamento
          END
      WHERE id_ocorrencia = $2
      RETURNING *;
    `, [estado, id]);
    return resultado.rows[0] || null;
  }

  static async atualizarDados(id: number, dados: any) {
    const resultado = await pool.query(`
      UPDATE ocorrencias
      SET titulo = $1, descricao = $2, prioridade = $3,
          endereco = $4, latitude = $5, longitude = $6
      WHERE id_ocorrencia = $7
      RETURNING *;
    `, [
      dados.titulo,
      dados.descricao,
      dados.prioridade,
      dados.endereco,
      dados.latitude,
      dados.longitude,
      id,
    ]);
    return resultado.rows[0] || null;
  }

  static async eliminar(id: number) {
    // 🔴 CORREÇÃO: Deleta notificações (não têm cascade)
    await pool.query(`DELETE FROM notificacoes WHERE id_ocorrencia = $1;`, [id]);

    // historico tem cascade? Não no schema atual, mas vou manter explícito
    await pool.query(`DELETE FROM historico WHERE id_ocorrencia = $1;`, [id]);

    // ocorrencia_entidades e evidencias têm ON DELETE CASCADE,
    // mas se quiseres garantir, podes deletar explicitamente (opcional)
    // await pool.query(`DELETE FROM ocorrencia_entidades WHERE id_ocorrencia = $1;`, [id]);
    // await pool.query(`DELETE FROM evidencias WHERE id_ocorrencia = $1;`, [id]);

    await pool.query(`DELETE FROM ocorrencias WHERE id_ocorrencia = $1;`, [id]);
    return true;
  }

  static async listarPorUsuario(id_usuario: number) {
    const resultado = await pool.query(`
      SELECT o.*, u.nome_completo, c.nome AS categoria
      FROM ocorrencias o
      INNER JOIN usuarios u ON o.id_usuario = u.id_usuario
      INNER JOIN categorias_ocorrencias c ON o.id_categoria = c.id_categoria
      WHERE o.id_usuario = $1
      ORDER BY o.id_ocorrencia DESC;
    `, [id_usuario]);
    return resultado.rows;
  }

  static async listarPorEntidade(id_entidade: number) {
    const resultado = await pool.query(`
      SELECT o.*, u.nome_completo, c.nome AS categoria
      FROM ocorrencias o
      INNER JOIN usuarios u ON o.id_usuario = u.id_usuario
      INNER JOIN categorias_ocorrencias c ON o.id_categoria = c.id_categoria
      INNER JOIN ocorrencia_entidades oe ON o.id_ocorrencia = oe.id_ocorrencia
      WHERE oe.id_entidade = $1
      ORDER BY o.id_ocorrencia DESC;
    `, [id_entidade]);
    return resultado.rows;
  }
}