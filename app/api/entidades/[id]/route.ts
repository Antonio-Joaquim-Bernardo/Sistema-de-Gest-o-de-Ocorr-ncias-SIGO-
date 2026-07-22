import { NextRequest } from "next/server";
import EntidadeResponsavelController from "@/controllers/EntidadeResponsavelController";

interface Params {
  params: Promise<{ id: string }>;
}

function obterId(id: string): number {
  const idEntidade = Number(id);
  if (isNaN(idEntidade)) {
    throw new Error("ID da entidade inválido.");
  }
  return idEntidade;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await EntidadeResponsavelController.buscarPorId(obterId(id));
  } catch (error: any) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await EntidadeResponsavelController.atualizar(obterId(id), request);
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
    return await EntidadeResponsavelController.eliminar(obterId(id));
  } catch (error: any) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 400 }
    );
  }
}