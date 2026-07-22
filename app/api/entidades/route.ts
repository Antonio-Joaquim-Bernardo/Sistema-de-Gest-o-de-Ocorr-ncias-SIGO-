import { NextRequest } from "next/server";
import EntidadeResponsavelController from "@/controllers/EntidadeResponsavelController";

export async function GET() {
  return await EntidadeResponsavelController.listar();
}

export async function POST(request: NextRequest) {
  return await EntidadeResponsavelController.criar(request);
}