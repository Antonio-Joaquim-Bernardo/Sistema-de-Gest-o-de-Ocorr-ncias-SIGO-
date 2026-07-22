import pool from "../config/database";


export default class OcorrenciaEntidadeModel {

    static async adicionarEntidades(
        id_ocorrencia:number,
        entidades:number[]
    ){


        const resultados = [];


        for(const id_entidade of entidades){


            const sql = `

                INSERT INTO ocorrencia_entidades
                (
                    id_ocorrencia,
                    id_entidade
                )

                VALUES
                ($1,$2)

                ON CONFLICT
                (
                    id_ocorrencia,
                    id_entidade
                )

                DO NOTHING

                RETURNING *;

            `;



            const resultado =

                await pool.query(

                    sql,

                    [
                        id_ocorrencia,
                        id_entidade
                    ]

                );



            if(resultado.rows.length > 0){

                resultados.push(
                    resultado.rows[0]
                );

            }


        }



        return resultados;


    }


    static async listarPorOcorrencia(
        id_ocorrencia:number
    ){


        const sql = `

            SELECT

                e.id_entidade,

                e.nome,


                oe.data_atribuicao


            FROM ocorrencia_entidades oe


            INNER JOIN entidades_responsaveis e

            ON e.id_entidade = oe.id_entidade


            WHERE oe.id_ocorrencia = $1;


        `;



        const resultado =
            await pool.query(

                sql,

                [id_ocorrencia]

            );



        return resultado.rows;

    }





    static async removerEntidade(

        id_ocorrencia:number,

        id_entidade:number

    ){


        const sql = `

            DELETE FROM ocorrencia_entidades

            WHERE id_ocorrencia=$1

            AND id_entidade=$2;

        `;



        await pool.query(

            sql,

            [
                id_ocorrencia,
                id_entidade
            ]

        );



        return true;

    }


}