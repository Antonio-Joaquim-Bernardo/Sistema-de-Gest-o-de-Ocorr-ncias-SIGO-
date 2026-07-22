import { NextRequest } from "next/server";
import UsuarioController from "@/controllers/UsuarioController";
import { autenticar } from "@/middleware/auth";
import { verificarPermissao } from "@/middleware/permissions";



interface Params {

    params: Promise<{

        id:string;

    }>;

}







export async function PATCH(

    request:NextRequest,

    {params}:Params

){


    try {



        const {id} = await params;



        const idUsuario = Number(id);





        if(isNaN(idUsuario)){


            return Response.json(

                {

                    mensagem:

                    "ID do usuário inválido."

                },

                {

                    status:400

                }

            );

        }







        const usuario =

            autenticar(request);







        verificarPermissao(

            (usuario as any).tipo_funcao,

            [

                "super_admin"

            ]

        );








        return await UsuarioController.atualizarFuncao(

            idUsuario,

            request

        );




    }catch(erro:any){



        return Response.json(

            {

                mensagem:

                erro.message

            },

            {

                status:401

            }

        );


    }


}