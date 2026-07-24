import pool from "../config/database";

export default class UsuarioModel {
  static async criar(dados: any) {
    const sql = `
      INSERT INTO usuarios (
        nome_completo, email, bi, data_nascimento, morada,
        foto_perfil, telefone, senha, genero
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id_usuario, nome_completo, email, estado, tipo_funcao, data_criacao;
    `;

    const resultado = await pool.query(sql, [
      dados.nome_completo,
      dados.email,
      dados.bi,
      dados.data_nascimento,
      dados.morada,
      dados.foto_perfil,
      dados.telefone,
      dados.senha,
      dados.genero,
    ]);

    return resultado.rows[0];
  }

  static async listar() {
    const sql = `
      SELECT id_usuario, nome_completo, email, telefone, estado, tipo_funcao, data_criacao
      FROM usuarios ORDER BY id_usuario DESC;
    `;
    const resultado = await pool.query(sql);
    return resultado.rows;
  }

  static async buscarPorId(id_usuario: number) {
    const sql = `
      SELECT id_usuario, nome_completo, email, bi, data_nascimento, morada,
             foto_perfil, telefone, genero, estado, tipo_funcao, data_criacao
      FROM usuarios WHERE id_usuario = $1;
    `;
    const resultado = await pool.query(sql, [id_usuario]);
    return resultado.rows[0] || null;
  }

  static async buscarPorEmail(email: string) {
    const sql = `SELECT * FROM usuarios WHERE email = $1;`;
    const resultado = await pool.query(sql, [email]);
    return resultado.rows[0] || null;
  }

static async buscarPorBI(bi: string) {
  const sql = `SELECT * FROM usuarios WHERE bi = $1;`;
  const resultado = await pool.query(sql, [bi]);
  return resultado.rows[0] || null;
}

  static async atualizar(id_usuario: number, dados: any) {
    const sql = `
      UPDATE usuarios
      SET nome_completo = $1, email = $2, telefone = $3, morada = $4, foto_perfil = $5
      WHERE id_usuario = $6
      RETURNING id_usuario, nome_completo, email, telefone, morada, foto_perfil, estado, tipo_funcao;
    `;
    const resultado = await pool.query(sql, [
      dados.nome_completo,
      dados.email,
      dados.telefone,
      dados.morada,
      dados.foto_perfil,
      id_usuario,
    ]);
    return resultado.rows[0] || null;
  }

  static async atualizarSenha(id_usuario: number, senha: string) {
    const sql = `UPDATE usuarios SET senha = $1 WHERE id_usuario = $2 RETURNING id_usuario;`;
    const resultado = await pool.query(sql, [senha, id_usuario]);
    return resultado.rows[0] || null;
  }

  static async atualizarEstado(id_usuario: number, estado: string) {
    const sql = `UPDATE usuarios SET estado = $1 WHERE id_usuario = $2 RETURNING *;`;
    const resultado = await pool.query(sql, [estado, id_usuario]);
    return resultado.rows[0] || null;
  }

  static async atualizarFuncao(id_usuario: number, tipo_funcao: string) {
    const sql = `UPDATE usuarios SET tipo_funcao = $1 WHERE id_usuario = $2 RETURNING *;`;
    const resultado = await pool.query(sql, [tipo_funcao, id_usuario]);
    return resultado.rows[0] || null;
  }

  static async eliminar(id_usuario: number) {
    await pool.query(`DELETE FROM usuarios WHERE id_usuario = $1;`, [id_usuario]);
    return true;
  }


}