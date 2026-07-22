import { NextRequest } from "next/server";
import HistoricoController from "@/controllers/HistoricoController";
import { obterId } from "@/utils/helpers";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await HistoricoController.listarPorOcorrencia(obterId(id));
  } catch (error: any) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 400 }
    );
  }
}