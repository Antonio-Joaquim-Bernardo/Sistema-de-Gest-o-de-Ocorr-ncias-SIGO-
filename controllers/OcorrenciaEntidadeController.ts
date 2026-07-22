import { NextRequest, NextResponse } from "next/server";
import OcorrenciaEntidadeService from "../services/OcorrenciaEntidadeService";
import { autenticar } from "@/middleware/auth";



export default class OcorrenciaEntidadeController {


static async adicionar(

    req: NextRequest,

    id_ocorrencia:number

){


    try {


        const usuario =

            autenticar(req);



        const {

            entidades

        } = await req.json();





        const resultado =

            await OcorrenciaEntidadeService.adicionarEntidades(

                id_ocorrencia,

                entidades,

                (usuario as any).id_usuario

            );





        return NextResponse.json(

            {

                mensagem:
                "Entidades atribuídas com sucesso.",


                entidades:
                resultado

            },

            {

                status:201

            }

        );



    }catch(erro:any){



        return NextResponse.json(

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


    static async listar(

        id_ocorrencia:number

    ){



        try {



            const entidades =

                await OcorrenciaEntidadeService.listarEntidades(

                    id_ocorrencia

                );





            return NextResponse.json(


                entidades,


                {

                    status:200

                }


            );




        }catch(erro:any){



            return NextResponse.json(


                {

                    mensagem:
                    erro.message

                },


                {

                    status:404

                }


            );


        }



    }









    static async remover(

        req:NextRequest,

        id_ocorrencia:number,

        id_entidade:number

    ){



        try {



            const usuario =

                autenticar(req);





            await OcorrenciaEntidadeService.removerEntidade(

                id_ocorrencia,

                id_entidade,

                usuario

            );





            return NextResponse.json(


                {

                    mensagem:
                    "Entidade removida da ocorrência."

                },


                {

                    status:200

                }


            );




        }catch(erro:any){



            return NextResponse.json(


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



}