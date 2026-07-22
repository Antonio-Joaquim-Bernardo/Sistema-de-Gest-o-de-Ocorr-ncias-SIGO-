import bcrypt from "bcrypt";
import UsuarioModel from "../models/UsuarioModel";
import { criarToken } from "../lib/auth";



export default class UsuarioService {



    static async criarUsuario(

        dados:any

    ){


        if(

            !dados.nome_completo ||

            !dados.email ||

            !dados.senha

        ){

            throw new Error(

                "Nome, email e senha são obrigatórios."

            );

        }




        const usuarioExistente =

            await UsuarioModel.buscarPorEmail(

                dados.email

            );



        if(usuarioExistente){


            throw new Error(

                "Este email já está cadastrado."

            );

        }





        const senhaHash =

            await bcrypt.hash(

                dados.senha,

                10

            );



        dados.senha = senhaHash;



        // Todo cadastro normal começa como cidadão pendente

        dados.tipo_funcao = "cidadao";

        dados.estado = "pendente";





        return await UsuarioModel.criar(

            dados

        );


    }









    static async login(

        email:string,

        senha:string

    ){



        const usuario =

            await UsuarioModel.buscarPorEmail(

                email

            );



        if(!usuario){


            throw new Error(

                "Email ou senha incorretos."

            );

        }





        if(usuario.estado === "bloqueado"){


            throw new Error(

                "Esta conta está bloqueada."

            );

        }





        const senhaValida =

            await bcrypt.compare(

                senha,

                usuario.senha

            );



        if(!senhaValida){


            throw new Error(

                "Email ou senha incorretos."

            );

        }





        const token =

            criarToken({

                id_usuario:
                usuario.id_usuario,


                tipo_funcao:
                usuario.tipo_funcao

            });





        return {


            usuario:{


                id_usuario:
                usuario.id_usuario,


                nome_completo:
                usuario.nome_completo,


                email:
                usuario.email,


                tipo_funcao:
                usuario.tipo_funcao,


                estado:
                usuario.estado


            },


            token


        };


    }









    static async listarUsuarios(){


        return await UsuarioModel.listar();


    }









    static async buscarUsuario(

        id:number

    ){



        const usuario =

            await UsuarioModel.buscarPorId(

                id

            );



        if(!usuario){


            throw new Error(

                "Usuário não encontrado."

            );

        }



        return usuario;


    }









    static async atualizarUsuario(

        id:number,

        dados:any

    ){



        await this.buscarUsuario(

            id

        );



        return await UsuarioModel.atualizar(

            id,

            dados

        );


    }









    static async atualizarSenha(

        id:number,

        novaSenha:string

    ){



        await this.buscarUsuario(

            id

        );



        const senhaHash =

            await bcrypt.hash(

                novaSenha,

                10

            );



        return await UsuarioModel.atualizarSenha(

            id,

            senhaHash

        );


    }









    static async atualizarEstado(

        id:number,

        estado:string

    ){



        const estadosPermitidos=[


            "pendente",

            "confirmado",

            "bloqueado"


        ];



        if(

            !estadosPermitidos.includes(

                estado

            )

        ){

            throw new Error(

                "Estado inválido."

            );

        }





        await this.buscarUsuario(

            id

        );



        return await UsuarioModel.atualizarEstado(

            id,

            estado

        );


    }









    static async atualizarFuncao(

        id:number,

        tipo_funcao:string

    ){



        const funcoesPermitidas=[


            "super_admin",

            "admin_inema",

            "admin_bombeiros",

            "admin_pna",

            "cidadao"


        ];



        if(

            !funcoesPermitidas.includes(

                tipo_funcao

            )

        ){

            throw new Error(

                "Função inválida."

            );

        }





        await this.buscarUsuario(

            id

        );



        return await UsuarioModel.atualizarFuncao(

            id,

            tipo_funcao

        );


    }









    static async eliminarUsuario(

        id:number

    ){



        await this.buscarUsuario(

            id

        );



        return await UsuarioModel.eliminar(

            id

        );


    }



}