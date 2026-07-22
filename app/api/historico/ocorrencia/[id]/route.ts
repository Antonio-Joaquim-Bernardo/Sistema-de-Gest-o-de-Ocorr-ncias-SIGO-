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



        const idOcorrencia =

            Number(id);




        if(isNaN(idOcorrencia)){


            return Response.json(

                {

                    mensagem:

                    "ID da ocorrência inválido."

                },

                {

                    status:400

                }

            );


        }





        return await HistoricoController.listarPorOcorrencia(

            idOcorrencia

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