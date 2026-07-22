import { NextRequest, NextResponse } from "next/server";
import EntidadeResponsavelService from "../services/EntidadeResponsavelService";


export default class EntidadeResponsavelController {


    static async listar(){

        try{

            const entidades =
                await EntidadeResponsavelService.listarEntidades();


            return NextResponse.json(
                entidades,
                {
                    status:200
                }
            );


        }catch(erro:any){

            return NextResponse.json(
                {
                    mensagem:erro.message
                },
                {
                    status:500
                }
            );

        }

    }





    static async buscarPorId(
        id:number
    ){

        try{

            const entidade =
                await EntidadeResponsavelService.buscarEntidade(
                    id
                );


            return NextResponse.json(
                entidade,
                {
                    status:200
                }
            );


        }catch(erro:any){

            return NextResponse.json(
                {
                    mensagem:erro.message
                },
                {
                    status:404
                }
            );

        }

    }





    static async criar(
        req:NextRequest
    ){

        try{

            const dados =
                await req.json();


            const entidade =
                await EntidadeResponsavelService.criarEntidade(
                    dados
                );


            return NextResponse.json(
                {
                    mensagem:"Entidade criada com sucesso.",
                    entidade
                },
                {
                    status:201
                }
            );


        }catch(erro:any){

            return NextResponse.json(
                {
                    mensagem:erro.message
                },
                {
                    status:400
                }
            );

        }

    }





    static async atualizar(
        id:number,
        req:NextRequest
    ){

        try{

            const dados =
                await req.json();


            const entidade =
                await EntidadeResponsavelService.atualizarEntidade(
                    id,
                    dados
                );


            return NextResponse.json(
                {
                    mensagem:"Entidade atualizada com sucesso.",
                    entidade
                },
                {
                    status:200
                }
            );


        }catch(erro:any){

            return NextResponse.json(
                {
                    mensagem:erro.message
                },
                {
                    status:400
                }
            );

        }

    }





    static async eliminar(
        id:number
    ){

        try{

            await EntidadeResponsavelService.eliminarEntidade(
                id
            );


            return NextResponse.json(
                {
                    mensagem:"Entidade eliminada com sucesso."
                },
                {
                    status:200
                }
            );


        }catch(erro:any){

            return NextResponse.json(
                {
                    mensagem:erro.message
                },
                {
                    status:400
                }
            );

        }

    }

}