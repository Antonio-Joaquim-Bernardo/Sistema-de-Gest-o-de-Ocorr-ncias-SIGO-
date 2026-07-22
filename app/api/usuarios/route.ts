import { NextRequest } from "next/server";
import UsuarioController from "@/controllers/UsuarioController";
import { autenticar } from "@/middleware/auth";

export async function POST(request: NextRequest) {
  return await UsuarioController.criar(request);
}

export async function GET(request: NextRequest) {
  try {
    // Apenas autenticado para listar usuários
    autenticar(request);
    return await UsuarioController.listar();
  } catch (error: any) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 401 }
    );
  }
}