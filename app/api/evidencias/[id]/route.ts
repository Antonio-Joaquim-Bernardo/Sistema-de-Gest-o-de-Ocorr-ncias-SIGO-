import { NextRequest } from "next/server";
import EvidenciaController from "@/controllers/EvidenciaController";
import { obterId } from "@/utils/helpers";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await EvidenciaController.buscarPorId(request, obterId(id));
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
    return await EvidenciaController.eliminar(request, obterId(id));
  } catch (error: any) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 400 }
    );
  }
}