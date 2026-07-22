import { NextRequest, NextResponse } from "next/server";
import HistoricoService from "../services/HistoricoService";
import { autenticar } from "@/middleware/auth";


export default class HistoricoController {



    static async criar(

        req:NextRequest

    ){


        try {


            const usuario =

                autenticar(req);



            const dados =

                await req.json();



            dados.id_usuario =

                usuario.id_usuario;





            const historico =

                await HistoricoService.registrar(

                    dados

                );





            return NextResponse.json(

                {

                    mensagem:

                    "Histórico registrado com sucesso.",

                    historico

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

                    status:400

                }

            );


        }


    }









    static async listarTodos(

        req:NextRequest

    ){


        try {


            autenticar(req);




            const historico =

                await HistoricoService.listarTodos();





            return NextResponse.json(

                historico,

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









    static async listarPorOcorrencia(

        id_ocorrencia:number

    ){


        try {


            const historico =

                await HistoricoService.listarPorOcorrencia(

                    id_ocorrencia

                );





            return NextResponse.json(

                historico,

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









    static async listarPorUsuario(

        id_usuario:number

    ){


        try {


            const historico =

                await HistoricoService.listarPorUsuario(

                    id_usuario

                );





            return NextResponse.json(

                historico,

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









    static async buscarPorId(

        id_historico:number

    ){


        try {


            const historico =

                await HistoricoService.buscarPorId(

                    id_historico

                );





            return NextResponse.json(

                historico,

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



}