import UsuarioController from "@/controllers/UsuarioController";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return UsuarioController.criar(request);
}