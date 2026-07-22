import { NextRequest, NextResponse } from "next/server";
import OcorrenciaService from "../services/OcorrenciaService";
import { autenticar } from "@/middleware/auth";


export default class OcorrenciaController {


    static async criar(
        req:NextRequest
    ){

        try{

            const usuario =
                autenticar(req);


            const dados =
                await req.json();


            dados.id_usuario =
                usuario.id_usuario;



            const ocorrencia =
                await OcorrenciaService.criarOcorrencia(
                    dados
                );


            return NextResponse.json(
                {
                    mensagem:
                    "Ocorrência criada com sucesso.",

                    ocorrencia
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







    static async listar(
        req:NextRequest
    ){

        try{


            const usuario =
                autenticar(req);



            const ocorrencias =
                await OcorrenciaService.listarOcorrencias(
                    usuario
                );



            return NextResponse.json(
                ocorrencias,
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







    static async buscarPorId(
        id:number,
        req:NextRequest
    ){

        try{


            const usuario =
                autenticar(req);



            const ocorrencia =
                await OcorrenciaService.buscarOcorrencia(
                    id,
                    usuario
                );



            return NextResponse.json(
                ocorrencia,
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









    static async atualizarEstado(
        id:number,
        req:NextRequest
    ){

        try{


            const usuario =
                autenticar(req);



            const {
                estado
            } = await req.json();




            const ocorrencia =
                await OcorrenciaService.atualizarEstado(
                    id,
                    estado,
                    usuario
                );



            return NextResponse.json(
                {
                    mensagem:
                    "Estado atualizado com sucesso.",

                    ocorrencia
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
                    status:400
                }
            );

        }

    }









    static async atualizarDados(
        id:number,
        req:NextRequest
    ){

        try{


            const usuario =
                autenticar(req);



            const dados =
                await req.json();




            const ocorrencia =
                await OcorrenciaService.atualizarOcorrencia(
                    id,
                    dados,
                    usuario
                );



            return NextResponse.json(
                {
                    mensagem:
                    "Dados da ocorrência atualizados com sucesso.",

                    ocorrencia
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
                    status:400
                }
            );

        }

    }









    static async eliminar(
        id:number,
        req:NextRequest
    ){

        try{


            const usuario =
                autenticar(req);



            await OcorrenciaService.eliminarOcorrencia(
                id,
                usuario
            );



            return NextResponse.json(
                {
                    mensagem:
                    "Ocorrência eliminada com sucesso."
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
                    status:400
                }
            );

        }

    }


}