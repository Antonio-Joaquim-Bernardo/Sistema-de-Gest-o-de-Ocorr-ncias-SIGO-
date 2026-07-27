import { NextRequest } from "next/server";
import VerificacaoController from "@/controllers/VerificacaoController";

export async function POST(req: NextRequest) {
  return VerificacaoController.reenviar(req);
}