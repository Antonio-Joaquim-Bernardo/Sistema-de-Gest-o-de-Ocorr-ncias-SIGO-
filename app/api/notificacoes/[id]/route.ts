import { NextRequest } from "next/server";
import NotificacaoController from "@/controllers/NotificacaoController";
import { obterId } from "@/utils/helpers";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await NotificacaoController.marcarComoLida(request, obterId(id));
  } catch (error: any) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await NotificacaoController.eliminar(request, obterId(id));
  } catch (error: any) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 400 }
    );
  }
}