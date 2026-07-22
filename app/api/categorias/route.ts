import { NextRequest } from "next/server";
import CategoriaController from "@/controllers/CategoriaController";
import { autenticar } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    // Opcional: requer autenticação para listar categorias
    autenticar(request);
    return await CategoriaController.listar();
  } catch (error: any) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 401 }
    );
  }
}