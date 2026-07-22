import { NextRequest } from "next/server";
import OcorrenciaController from "@/controllers/OcorrenciaController";


interface Params {

    params:Promise<{
        id:string;
    }>;

}



function obterId(
    id:string
){

    const idOcorrencia =
        Number(id);


    if(isNaN(idOcorrencia)){

        throw new Error(
            "ID inválido."
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


        return await OcorrenciaController.buscarPorId(

            obterId(id),

            request

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









export async function PATCH(

    request:NextRequest,

    {params}:Params

){


    try{


        const {id} =
            await params;



        return await OcorrenciaController.atualizarEstado(

            obterId(id),

            request

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









export async function PUT(

    request:NextRequest,

    {params}:Params

){


    try{


        const {id} =
            await params;



        return await OcorrenciaController.atualizarDados(

            obterId(id),

            request

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









export async function DELETE(

    request:NextRequest,

    {params}:Params

){


    try{


        const {id} =
            await params;



        return await OcorrenciaController.eliminar(

            obterId(id),

            request

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