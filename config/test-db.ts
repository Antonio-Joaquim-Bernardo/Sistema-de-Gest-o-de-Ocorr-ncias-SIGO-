import pool from "./database";


async function testar(){

    try{

        const resultado =
            await pool.query(
                "SELECT NOW();"
            );


        console.log(
            "Banco conectado:",
            resultado.rows
        );


    }catch(error){

        console.log(
            "Erro na conexão:",
            error
        );

    }

}


testar();