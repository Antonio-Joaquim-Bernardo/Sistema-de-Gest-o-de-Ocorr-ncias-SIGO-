import { NextRequest } from "next/server";
import NotificacaoController from "@/controllers/NotificacaoController";

interface Params {
  params: Promise<{ id: string }>;
}

function obterIdUsuario(id: string): number {
  const idUsuario = Number(id);
  if (isNaN(idUsuario) || idUsuario <= 0) {
    throw new Error("ID do usuário inválido.");
  }
  return idUsuario;
}

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;
    const idUsuario = obterIdUsuario(id);
    return await NotificacaoController.listarPorUsuario(request, idUsuario);
  } catch (erro: any) {
    return Response.json(
      { sucesso: false, mensagem: erro.message },
      { status: 400 }
    );
  }
}