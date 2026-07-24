import { NextRequest } from "next/server";
import UsuarioController from "@/controllers/UsuarioController";

interface Params {
  params: Promise<{ id: string }>;
}

function obterIdUsuario(id: string): number {
  const idUsuario = Number(id);
  if (isNaN(idUsuario)) {
    throw new Error("ID do usuário inválido.");
  }
  return idUsuario;
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await UsuarioController.atualizarSenha(obterIdUsuario(id), request);
  } catch (erro: any) {
    return Response.json(
      { mensagem: erro.message },
      { status: 400 }
    );
  }
}