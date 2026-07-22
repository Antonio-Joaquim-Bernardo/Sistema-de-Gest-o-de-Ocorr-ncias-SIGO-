import { NextRequest } from "next/server";
import HistoricoController from "@/controllers/HistoricoController";


interface Params {

    params: Promise<{

        id:string;

    }>;

}





export async function GET(

    request:NextRequest,

    {params}:Params

){


    try {


        const {id} = await params;



        const idHistorico =

            Number(id);




        if(isNaN(idHistorico)){


            return Response.json(

                {

                    mensagem:

                    "ID do histórico inválido."

                },

                {

                    status:400

                }

            );


        }





        return await HistoricoController.buscarPorId(

            idHistorico

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