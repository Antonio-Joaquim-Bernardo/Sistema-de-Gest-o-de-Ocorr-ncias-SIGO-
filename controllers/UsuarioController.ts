import { NextRequest, NextResponse } from "next/server";
import UsuarioService from "../services/UsuarioService";


export default class UsuarioController {


    static async criar(
        req: NextRequest
    ) {

        try {

            const dados =
                await req.json();


            const usuario =
                await UsuarioService.criarUsuario(
                    dados
                );


            return NextResponse.json(
                {
                    mensagem:
                    "Usuário criado com sucesso.",
                    
                    usuario
                },
                {
                    status: 201
                }
            );


        } catch (erro:any) {


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





    static async login(
        req: NextRequest
    ) {

        try {


            const {
                email,
                senha
            } =
            await req.json();



            const usuario =
                await UsuarioService.login(
                    email,
                    senha
                );



            return NextResponse.json(
                {
                    mensagem:
                    "Login realizado com sucesso.",

                    usuario
                },
                {
                    status:200
                }
            );


        } catch(erro:any) {


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





    static async listar() {

        try {


            const usuarios =
                await UsuarioService.listarUsuarios();



            return NextResponse.json(
                usuarios,
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
                    status:500
                }
            );

        }

    }




    static async buscarPorId(
        id:number
    ){

        try {


            const usuario =
                await UsuarioService.buscarUsuario(
                    id
                );


            return NextResponse.json(
                usuario,
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