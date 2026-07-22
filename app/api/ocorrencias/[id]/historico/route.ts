import { NextRequest } from "next/server";
import HistoricoController from "@/controllers/HistoricoController";


interface Params {

    params:Promise<{
        id:string;
    }>;

}



function obterIdOcorrencia(
    id:string
){

    const idOcorrencia =
        Number(id);


    if(isNaN(idOcorrencia)){

        throw new Error(
            "ID da ocorrência inválido."
        );

    }


    return idOcorrencia;

}








export async function GET(

    request:NextRequest,

    {params}:Params

){


    try{


        const {id} =
            await params;



        return await HistoricoController.listarPorOcorrencia(

            obterIdOcorrencia(id)

        );



    }catch(erro:any){


        return Response.json(

            {
                mensagem:
                erro.message
            },

            {
                status:400
            }

        );

    }

}