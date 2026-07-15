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

    static async listarUsuarios() {

        return await UsuarioModel.listar();

    }

    static async buscarUsuario(id: number) {

        const usuario =
            await UsuarioModel.buscarPorId(id);

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
            await UsuarioModel.buscarPorId(id);

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
        id: number
    ) {

        const usuario =
            await UsuarioModel.buscarPorId(id);

        if (!usuario) {
            throw new Error(
                "Usuário não encontrado."
            );
        }

        return await UsuarioModel.eliminar(id);
    }

}