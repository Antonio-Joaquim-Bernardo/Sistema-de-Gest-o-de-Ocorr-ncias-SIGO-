import { NextRequest } from "next/server";
import DashboardController from "@/controllers/DashboardController";

interface Params {
  params: Promise<{ id: string }>;
}

function obterIdEntidade(id: string): number {
  const idEntidade = Number(id);
  if (isNaN(idEntidade)) {
    throw new Error("ID da entidade inválido.");
  }
  return idEntidade;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    return await DashboardController.estatisticasPorEntidade(
      request,
      obterIdEntidade(id)
    );
  } catch (erro: any) {
    return Response.json(
      { mensagem: erro.message },
      { status: 400 }
    );
  }
}