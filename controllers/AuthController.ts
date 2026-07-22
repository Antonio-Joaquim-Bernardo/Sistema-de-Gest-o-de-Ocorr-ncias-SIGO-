import { NextRequest, NextResponse } from "next/server";
import AuthService from "../services/AuthService";
import ApiResponse from "../utils/response";

export default class AuthController {
  /**
   * Registra um novo usuário (cidadão)
   */
  static async registrar(req: NextRequest) {
    try {
      const dados = await req.json();
      const usuario = await AuthService.registrar(dados);

      return ApiResponse.criado(
        { usuario },
        "Usuário cadastrado com sucesso."
      );
    } catch (erro: any) {
      return ApiResponse.erro(
        erro.message,
        400
      );
    }
  }

  /**
   * Realiza login e retorna token
   */
  static async login(req: NextRequest) {
    try {
      const { email, senha } = await req.json();

      const resultado =
        await AuthService.login(
          email,
          senha
        );

      const resposta = NextResponse.json(
        {
          sucesso: true,
          mensagem: "Login realizado com sucesso.",
          usuario: resultado.usuario,
          token: resultado.token
        },
        {
          status: 200
        }
      );

      resposta.cookies.set(
        "token",
        resultado.token,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/"
        }
      );

      return resposta;

    } catch (erro: any) {

      return ApiResponse.erro(
        erro.message,
        401
      );

    }
  }

  /**
   * Logout
   */
  static async logout() {
    const resposta = NextResponse.json(
      {
        sucesso: true,
        mensagem: "Logout realizado com sucesso."
      },
      {
        status: 200
      }
    );

    resposta.cookies.set(
      "token",
      "",
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/"
      }
    );

    return resposta;
  }
}