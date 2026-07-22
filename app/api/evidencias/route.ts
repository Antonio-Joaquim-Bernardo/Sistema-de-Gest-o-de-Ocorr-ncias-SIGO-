import { NextRequest } from "next/server";
import EvidenciaController from "@/controllers/EvidenciaController";

export async function POST(request: NextRequest) {
  return await EvidenciaController.criar(request);
}