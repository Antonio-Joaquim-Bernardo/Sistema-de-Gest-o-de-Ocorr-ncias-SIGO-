import bcrypt from "bcrypt";
import UsuarioService from "../services/UsuarioService";
import UsuarioModel from "../models/UsuarioModel";
import { gerarToken } from "../utils/jwt";

export default class AuthController {

    static async registrar(dados: any) {

        const novoUsuario =
            await UsuarioService.criarUsuario(dados);

        return {
            sucesso: true,
            mensagem: "Usuário cadastrado com sucesso.",
            usuario: novoUsuario
        };
    }

    static async login(
        email: string,
        senha: string
    ) {

        const usuario =
            await UsuarioModel.buscarPorEmail(email);

        if (!usuario) {
            throw new Error(
                "Email ou senha inválidos."
            );
        }

        const senhaValida =
            await bcrypt.compare(
                senha,
                usuario.senha
            );

        if (!senhaValida) {
            throw new Error(
                "Email ou senha inválidos."
            );
        }

        const token =
            gerarToken({
                id_usuario: usuario.id_usuario,
                email: usuario.email,
                tipo_funcao: usuario.tipo_funcao
            });

        return {
            sucesso: true,
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nome_completo: usuario.nome_completo,
                email: usuario.email,
                tipo_funcao: usuario.tipo_funcao
            }
        };
    }

}