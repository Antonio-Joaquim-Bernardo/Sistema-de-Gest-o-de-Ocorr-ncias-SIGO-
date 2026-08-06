import { NextRequest } from "next/server";
import UsuarioController from "@/controllers/UsuarioController";

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

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;
    return await UsuarioController.atualizarEstado(obterIdUsuario(id), request);
  } catch (erro: any) {
    return Response.json(
      { sucesso: false, mensagem: erro.message },
      { status: 400 }
    );
  }
}