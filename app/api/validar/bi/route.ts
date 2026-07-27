import { NextRequest } from "next/server";
import UsuarioModel from "@/models/UsuarioModel";
import ApiResponse from "@/utils/response";

export async function GET(req: NextRequest) {
  try {
    const bi = req.nextUrl.searchParams.get("bi");
    if (!bi) {
      return ApiResponse.erro("BI é obrigatório.", 400);
    }

    // Valida formato (exemplo: 9 dígitos, pode ajustar)
    const regex = /^\d{9}$/;
    if (!regex.test(bi)) {
      return ApiResponse.sucesso({ valido: false, mensagem: "BI inválido (deve ter 9 dígitos)." });
    }

    // Verifica se já existe
    const usuario = await UsuarioModel.buscarPorBI(bi);
    if (usuario) {
      return ApiResponse.sucesso({ valido: false, mensagem: "BI já cadastrado." });
    }

    return ApiResponse.sucesso({ valido: true, mensagem: "BI disponível." });
  } catch (erro: any) {
    return ApiResponse.erro(erro.message, 500);
  }
}