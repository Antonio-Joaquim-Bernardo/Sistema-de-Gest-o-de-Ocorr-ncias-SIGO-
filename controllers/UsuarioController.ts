import { NextRequest, NextResponse } from "next/server";
import UsuarioService from "../services/UsuarioService";
import ApiResponse from "../utils/response";

export default class UsuarioController {
  static async criar(req: NextRequest) {
    try {
      const dados = await req.json();
      const usuario = await UsuarioService.criarUsuario(dados);
      return ApiResponse.criado({ usuario }, "Usuário criado com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async login(req: NextRequest) {
    try {
      const { email, senha } = await req.json();
      const resultado = await UsuarioService.login(email, senha);

      const resposta = NextResponse.json(
        {
          sucesso: true,
          mensagem: "Login realizado com sucesso.",
          usuario: resultado.usuario,
        },
        { status: 200 }
      );

      resposta.cookies.set("token", resultado.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return resposta;
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 401);
    }
  }

  static async listar() {
    try {
      const usuarios = await UsuarioService.listarUsuarios();
      return ApiResponse.sucesso(usuarios);
    } catch (erro: any) {
      return ApiResponse.erroInterno(erro.message);
    }
  }

  static async buscarPorId(id: number) {
    try {
      const usuario = await UsuarioService.buscarUsuario(id);
      return ApiResponse.sucesso(usuario);
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }

  static async atualizar(id: number, req: NextRequest) {
    try {
      const dados = await req.json();
      const usuario = await UsuarioService.atualizarUsuario(id, dados);
      return ApiResponse.sucesso({ usuario }, "Usuário atualizado com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async atualizarSenha(id: number, req: NextRequest) {
    try {
      const { novaSenha } = await req.json();
      const usuario = await UsuarioService.atualizarSenha(id, novaSenha);
      return ApiResponse.sucesso({ usuario }, "Senha atualizada com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async atualizarEstado(id: number, req: NextRequest) {
    try {
      const { estado } = await req.json();
      const usuario = await UsuarioService.atualizarEstado(id, estado);
      const { senha, ...usuarioSeguro } = usuario;
      return ApiResponse.sucesso(
        { usuario: usuarioSeguro },
        "Estado do usuário atualizado com sucesso."
      );
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async atualizarFuncao(id: number, req: NextRequest) {
    try {
      const { tipo_funcao } = await req.json();
      const usuario = await UsuarioService.atualizarFuncao(id, tipo_funcao);
      const { senha, ...usuarioSeguro } = usuario;
      return ApiResponse.sucesso(
        { usuario: usuarioSeguro },
        "Função do usuário atualizada com sucesso."
      );
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  static async eliminar(id: number) {
    try {
      await UsuarioService.eliminarUsuario(id);
      return ApiResponse.sucesso(null, "Usuário eliminado com sucesso.");
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }
}