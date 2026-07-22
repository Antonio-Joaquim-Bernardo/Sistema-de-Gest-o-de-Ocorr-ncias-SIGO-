import { NextRequest } from "next/server";
import OcorrenciaController from "@/controllers/OcorrenciaController";

export async function POST(request: NextRequest) {
  return await OcorrenciaController.criar(request);
}

export async function GET(request: NextRequest) {
  return await OcorrenciaController.listar(request);
}