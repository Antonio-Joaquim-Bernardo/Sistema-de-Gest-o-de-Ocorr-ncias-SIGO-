import pool from "@/config/database";


export default class EntidadeResponsavelModel {



    // Listar todas as entidades responsáveis
    static async listar(){


        const sql = `

            SELECT

                id_entidade,

                nome,

                descricao

            FROM entidades_responsaveis

            ORDER BY nome ASC;

        `;



        const resultado =

            await pool.query(sql);



        return resultado.rows;


    }









    // Buscar entidade pelo ID
    static async buscarPorId(

        id:number

    ){



        const sql = `

            SELECT

                id_entidade,

                nome,

                descricao

            FROM entidades_responsaveis

            WHERE id_entidade=$1;

        `;



        const resultado =

            await pool.query(

                sql,

                [

                    id

                ]

            );



        return resultado.rows[0];


    }









    // Buscar entidade pelo nome
    static async buscarPorNome(

        nome:string

    ){



        const sql = `

            SELECT

                id_entidade,

                nome,

                descricao

            FROM entidades_responsaveis

            WHERE nome=$1;

        `;



        const resultado =

            await pool.query(

                sql,

                [

                    nome

                ]

            );



        return resultado.rows[0];


    }









    // Criar nova entidade
    static async criar(

        dados:any

    ){



        const sql = `

            INSERT INTO entidades_responsaveis

            (

                nome,

                descricao

            )

            VALUES

            (

                $1,

                $2

            )

            RETURNING *;

        `;



        const valores = [

            dados.nome,

            dados.descricao

        ];



        const resultado =

            await pool.query(

                sql,

                valores

            );



        return resultado.rows[0];


    }









    // Atualizar entidade
    static async atualizar(

        id:number,

        dados:any

    ){



        const sql = `

            UPDATE entidades_responsaveis

            SET

                nome=$1,

                descricao=$2

            WHERE id_entidade=$3

            RETURNING *;

        `;



        const valores = [

            dados.nome,

            dados.descricao,

            id

        ];



        const resultado =

            await pool.query(

                sql,

                valores

            );



        return resultado.rows[0];


    }









    // Eliminar entidade
    static async eliminar(

        id:number

    ){



        const sql = `

            DELETE FROM entidades_responsaveis

            WHERE id_entidade=$1;

        `;



        await pool.query(

            sql,

            [

                id

            ]

        );



        return true;


    }



}