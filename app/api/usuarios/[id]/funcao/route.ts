import { NextRequest } from "next/server";
import UsuarioController from "@/controllers/UsuarioController";
import { obterId } from "@/utils/helpers";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await UsuarioController.atualizarFuncao(obterId(id), request);
  } catch (error: any) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 400 }
    );
  }
}