import { NextRequest } from "next/server";
import EntidadeResponsavelController from "@/controllers/EntidadeResponsavelController";
import { autenticar } from "@/middleware/auth";
import { verificarPermissao } from "@/middleware/permissions";



export async function GET(){


    return EntidadeResponsavelController.listar();


}





export async function POST(

    request:NextRequest

){


    try{


        const usuario = autenticar(request);



        verificarPermissao(

            usuario.tipo_funcao,

            [
                "super_admin"
            ]

        );



        return EntidadeResponsavelController.criar(

            request

        );



    }catch(erro:any){


        return Response.json(

            {
                mensagem:erro.message
            },

            {
                status:401
            }

        );


    }


}