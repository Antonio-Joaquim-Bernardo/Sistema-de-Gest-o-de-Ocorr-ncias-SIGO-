import { NextRequest, NextResponse } from "next/server";
import UsuarioService from "../services/UsuarioService";
import ApiResponse from "../utils/response";
import { autenticar } from "@/middleware/auth";

export default class UsuarioController {
  /**
   * Registra um novo usuário (público)
   */
  static async criar(req: NextRequest) {
    try {
      const dados = await req.json();
      const usuario = await UsuarioService.criarUsuario(dados);
      return ApiResponse.criado({ usuario }, "Usuário criado com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  /**
   * Login do usuário
   */
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

  /**
   * Lista todos os usuários (apenas autenticado)
   */
  static async listar(req: NextRequest) {
    try {
      autenticar(req); // Apenas verifica autenticação
      const usuarios = await UsuarioService.listarUsuarios();
      return ApiResponse.sucesso(usuarios);
    } catch (erro: any) {
      return ApiResponse.naoAutorizado(erro.message);
    }
  }

  /**
   * Busca um usuário por ID (apenas autenticado)
   */
  static async buscarPorId(id: number, req: NextRequest) {
    try {
      autenticar(req);
      const usuario = await UsuarioService.buscarUsuario(id);
      return ApiResponse.sucesso(usuario);
    } catch (erro: any) {
      return ApiResponse.naoEncontrado(erro.message);
    }
  }

  /**
   * Atualiza dados do usuário (apenas o próprio ou admin)
   */
  static async atualizar(id: number, req: NextRequest) {
    try {
      const usuarioLogado = autenticar(req);
      // 🔒 Verifica permissão: apenas o próprio ou super_admin
      if (usuarioLogado.tipo_funcao !== "super_admin" && usuarioLogado.id_usuario !== id) {
        throw new Error("Você não tem permissão para atualizar este usuário.");
      }

      const dados = await req.json();
      const usuario = await UsuarioService.atualizarUsuario(id, dados);
      return ApiResponse.sucesso({ usuario }, "Usuário atualizado com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  /**
   * Atualiza a senha do usuário (apenas o próprio)
   */
  static async atualizarSenha(id: number, req: NextRequest) {
    try {
      const usuarioLogado = autenticar(req);
      if (usuarioLogado.id_usuario !== id) {
        throw new Error("Você só pode alterar sua própria senha.");
      }

      const { novaSenha } = await req.json();
      const usuario = await UsuarioService.atualizarSenha(id, novaSenha);
      return ApiResponse.sucesso({ usuario }, "Senha atualizada com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  /**
   * Atualiza o estado do usuário (apenas super_admin)
   */
  static async atualizarEstado(id: number, req: NextRequest) {
    try {
      const usuarioLogado = autenticar(req);
      if (usuarioLogado.tipo_funcao !== "super_admin") {
        throw new Error("Apenas Super Administradores podem alterar estados.");
      }

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

  /**
   * Atualiza a função do usuário (apenas super_admin)
   */
  static async atualizarFuncao(id: number, req: NextRequest) {
    try {
      const usuarioLogado = autenticar(req);
      if (usuarioLogado.tipo_funcao !== "super_admin") {
        throw new Error("Apenas Super Administradores podem alterar funções.");
      }

      const { tipo_funcao } = await req.json();
      const usuario = await UsuarioService.atualizarFuncao(
        id,
        tipo_funcao,
        usuarioLogado // 👈 Passa o usuário logado para proteção extra
      );
      const { senha, ...usuarioSeguro } = usuario;
      return ApiResponse.sucesso(
        { usuario: usuarioSeguro },
        "Função do usuário atualizada com sucesso."
      );
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }

  /**
   * Elimina um usuário (apenas super_admin)
   */
  static async eliminar(id: number, req: NextRequest) {
    try {
      const usuarioLogado = autenticar(req);
      if (usuarioLogado.tipo_funcao !== "super_admin") {
        throw new Error("Apenas Super Administradores podem eliminar usuários.");
      }

      await UsuarioService.eliminarUsuario(id, usuarioLogado); // 👈 Passa o usuário logado
      return ApiResponse.sucesso(null, "Usuário eliminado com sucesso.");
    } catch (erro: any) {
      return ApiResponse.erro(erro.message, 400);
    }
  }
}