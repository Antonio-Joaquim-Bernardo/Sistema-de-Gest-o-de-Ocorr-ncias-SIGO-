import { NextRequest } from "next/server";
import EvidenciaController from "@/controllers/EvidenciaController";

interface Params {
  params: Promise<{ id: string }>;
}

function obterIdEvidencia(id: string): number {
  const idEvidencia = Number(id);
  if (isNaN(idEvidencia)) {
    throw new Error("ID da evidência inválido.");
  }
  return idEvidencia;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await EvidenciaController.buscarPorId(
      request,
      obterIdEvidencia(id)
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
    return await EvidenciaController.eliminar(
      request,
      obterIdEvidencia(id)
    );
  } catch (erro: any) {
    return Response.json(
      { mensagem: erro.message },
      { status: 400 }
    );
  }
}