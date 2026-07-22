import { NextResponse } from "next/server";
import CategoriaService from "../services/CategoriaService";


export default class CategoriaController {



    static async listar(){


        try {


            const categorias =

                await CategoriaService.listarCategorias();



            return NextResponse.json(

                categorias,

                {
                    status:200
                }

            );



        } catch(erro:any){


            return NextResponse.json(

                {
                    mensagem:
                    erro.message
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


        try {


            const categoria =

                await CategoriaService.buscarCategoria(
                    id
                );



            return NextResponse.json(

                categoria,

                {
                    status:200
                }

            );



        } catch(erro:any){


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