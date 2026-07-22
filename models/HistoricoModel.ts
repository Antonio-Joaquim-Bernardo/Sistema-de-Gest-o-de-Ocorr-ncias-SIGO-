import pool from "../config/database";


export default class HistoricoModel {



    static async criar(

        dados:any

    ){


        const sql = `

            INSERT INTO historico

            (

                id_usuario,

                id_ocorrencia,

                acao

            )

            VALUES

            ($1,$2,$3)

            RETURNING *;

        `;



        const valores = [

            dados.id_usuario,

            dados.id_ocorrencia,

            dados.acao

        ];



        const resultado =

            await pool.query(

                sql,

                valores

            );



        return resultado.rows[0];


    }









    static async listarTodos(){


        const sql = `

            SELECT

                h.id_historico,

                h.acao,

                h.data_registro,

                h.id_ocorrencia,

                h.id_usuario,

                u.nome_completo,

                u.tipo_funcao,

                o.titulo

            FROM historico h

            INNER JOIN usuarios u

            ON h.id_usuario = u.id_usuario

            INNER JOIN ocorrencias o

            ON h.id_ocorrencia = o.id_ocorrencia

            ORDER BY h.id_historico DESC;

        `;



        const resultado =

            await pool.query(sql);



        return resultado.rows;


    }









    static async listarPorOcorrencia(

        id_ocorrencia:number

    ){



        const sql = `

            SELECT

                h.id_historico,

                h.acao,

                h.data_registro,

                h.id_ocorrencia,

                h.id_usuario,

                u.nome_completo,

                u.tipo_funcao

            FROM historico h

            INNER JOIN usuarios u

            ON h.id_usuario = u.id_usuario

            WHERE h.id_ocorrencia = $1

            ORDER BY h.id_historico DESC;

        `;



        const resultado =

            await pool.query(

                sql,

                [

                    id_ocorrencia

                ]

            );



        return resultado.rows;


    }









    static async listarPorUsuario(

        id_usuario:number

    ){



        const sql = `

            SELECT

                h.id_historico,

                h.acao,

                h.data_registro,

                h.id_ocorrencia,

                o.titulo

            FROM historico h

            INNER JOIN ocorrencias o

            ON h.id_ocorrencia = o.id_ocorrencia

            WHERE h.id_usuario = $1

            ORDER BY h.id_historico DESC;

        `;



        const resultado =

            await pool.query(

                sql,

                [

                    id_usuario

                ]

            );



        return resultado.rows;


    }









    static async buscarPorId(

        id_historico:number

    ){



        const sql = `

            SELECT *

            FROM historico

            WHERE id_historico = $1;

        `;



        const resultado =

            await pool.query(

                sql,

                [

                    id_historico

                ]

            );



        return resultado.rows[0];


    }



}