import pool from "../config/database";

export default class UsuarioModel {

    static async criar(dados: any) {
        const sql = `
            INSERT INTO usuarios (
                nome_completo,
                email,
                bi,
                idade,
                morada,
                telefone,
                senha,
                genero
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *;
        `;

        const valores = [
            dados.nome_completo,
            dados.email,
            dados.bi,
            dados.idade,
            dados.morada,
            dados.telefone,
            dados.senha,
            dados.genero
        ];

        const resultado = await pool.query(sql, valores);

        return resultado.rows[0];
    }

    static async listar() {

        const sql = `
            SELECT *
            FROM usuarios
            ORDER BY id_usuario DESC
        `;

        const resultado = await pool.query(sql);

        return resultado.rows;
    }

    static async buscarPorId(id: number) {

        const sql = `
            SELECT *
            FROM usuarios
            WHERE id_usuario = $1
        `;

        const resultado = await pool.query(sql, [id]);

        return resultado.rows[0];
    }

    static async buscarPorEmail(email: string) {

        const sql = `
            SELECT *
            FROM usuarios
            WHERE email = $1
        `;

        const resultado = await pool.query(sql, [email]);

        return resultado.rows[0];
    }

    static async atualizar(id: number, dados: any) {

        const sql = `
            UPDATE usuarios
            SET
                nome_completo = $1,
                email = $2,
                telefone = $3,
                morada = $4
            WHERE id_usuario = $5
            RETURNING *;
        `;

        const valores = [
            dados.nome_completo,
            dados.email,
            dados.telefone,
            dados.morada,
            id
        ];

        const resultado = await pool.query(sql, valores);

        return resultado.rows[0];
    }

    static async eliminar(id: number) {

        const sql = `
            DELETE FROM usuarios
            WHERE id_usuario = $1
        `;

        await pool.query(sql, [id]);

        return true;
    }

}