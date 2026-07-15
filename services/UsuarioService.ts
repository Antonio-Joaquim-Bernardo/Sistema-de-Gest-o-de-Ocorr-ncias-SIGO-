import bcrypt from "bcrypt";
import UsuarioModel from "../models/UsuarioModel";


export default class UsuarioService {


    static async criarUsuario(dados: any) {

        const usuarioExistente =
            await UsuarioModel.buscarPorEmail(
                dados.email
            );


        if (usuarioExistente) {
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


        const novoUsuario =
            await UsuarioModel.criar(
                dados
            );


        return novoUsuario;
    }



    static async login(
        email: string,
        senha: string
    ) {


        const usuario =
            await UsuarioModel.buscarPorEmail(
                email
            );


        if (!usuario) {
            throw new Error(
                "Email ou senha incorretos."
            );
        }



        if (usuario.estado === "bloqueado") {

            throw new Error(
                "Esta conta está bloqueada."
            );

        }



        const senhaValida =
            await bcrypt.compare(
                senha,
                usuario.senha
            );



        if (!senhaValida) {

            throw new Error(
                "Email ou senha incorretos."
            );

        }



        return {
            id_usuario: usuario.id_usuario,
            nome_completo: usuario.nome_completo,
            email: usuario.email,
            tipo_funcao: usuario.tipo_funcao,
            estado: usuario.estado
        };

    }




    static async listarUsuarios() {

        return await UsuarioModel.listar();

    }




    static async buscarUsuario(
        id: number
    ) {

        const usuario =
            await UsuarioModel.buscarPorId(
                id
            );


        if (!usuario) {

            throw new Error(
                "Usuário não encontrado."
            );

        }


        return usuario;
    }





    static async atualizarUsuario(
        id: number,
        dados: any
    ) {


        const usuario =
            await UsuarioModel.buscarPorId(
                id
            );


        if (!usuario) {

            throw new Error(
                "Usuário não encontrado."
            );

        }


        return await UsuarioModel.atualizar(
            id,
            dados
        );

    }





    static async eliminarUsuario(
        id:number
    ) {


        const usuario =
            await UsuarioModel.buscarPorId(
                id
            );


        if (!usuario) {

            throw new Error(
                "Usuário não encontrado."
            );

        }


        return await UsuarioModel.eliminar(
            id
        );

    }

}