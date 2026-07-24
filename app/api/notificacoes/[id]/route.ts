import { NextRequest } from "next/server";
import NotificacaoController from "@/controllers/NotificacaoController";

interface Params {
  params: Promise<{ id: string }>;
}

function obterIdNotificacao(id: string): number {
  const idNotificacao = Number(id);
  if (isNaN(idNotificacao)) {
    throw new Error("ID da notificação inválido.");
  }
  return idNotificacao;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await NotificacaoController.marcarComoLida(
      request,
      obterIdNotificacao(id)
    );
  } catch (erro: any) {
    return Response.json(
      { mensagem: erro.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await NotificacaoController.eliminar(
      request,
      obterIdNotificacao(id)
    );
  } catch (erro: any) {
    return Response.json(
      { mensagem: erro.message },
      { status: 400 }
    );
  }
}