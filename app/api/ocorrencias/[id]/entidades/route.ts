import { NextRequest } from "next/server";
import OcorrenciaEntidadeController from "@/controllers/OcorrenciaEntidadeController";


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








export async function POST(

    request:NextRequest,

    {params}:Params

){


    try{


        const {id} =
            await params;



        return await OcorrenciaEntidadeController.adicionar(

            request,

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









export async function GET(

    request:NextRequest,

    {params}:Params

){


    try{


        const {id} =
            await params;



        return await OcorrenciaEntidadeController.listar(

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









export async function DELETE(

    request:NextRequest,

    {params}:Params

){


    try{


        const {id} =
            await params;



        const idOcorrencia =
            obterIdOcorrencia(id);




        const {
            id_entidade
        } = await request.json();




        if(!id_entidade){

            throw new Error(
                "ID da entidade é obrigatório."
            );

        }



        return await OcorrenciaEntidadeController.remover(

            request,

            idOcorrencia,

            Number(id_entidade)

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