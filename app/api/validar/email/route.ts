import { NextRequest } from "next/server";
import UsuarioModel from "@/models/UsuarioModel";
import ApiResponse from "@/utils/response";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return ApiResponse.erro("Email é obrigatório.", 400);
    }

    // Valida formato
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return ApiResponse.sucesso({ valido: false, mensagem: "Email inválido." });
    }

    // Verifica se já existe
    const usuario = await UsuarioModel.buscarPorEmail(email);
    if (usuario) {
      return ApiResponse.sucesso({ valido: false, mensagem: "Email já cadastrado." });
    }

    return ApiResponse.sucesso({ valido: true, mensagem: "Email disponível." });
  } catch (erro: any) {
    return ApiResponse.erro(erro.message, 500);
  }
}