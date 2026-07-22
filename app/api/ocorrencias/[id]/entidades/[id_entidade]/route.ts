import { NextRequest } from "next/server";
import OcorrenciaEntidadeController from "@/controllers/OcorrenciaEntidadeController";
import { obterId } from "@/utils/helpers";

interface Params {
  params: Promise<{ id: string; id_entidade: string }>;
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id, id_entidade } = await params;
    return await OcorrenciaEntidadeController.remover(
      request,
      obterId(id),
      obterId(id_entidade)
    );
  } catch (error: any) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 400 }
    );
  }
}